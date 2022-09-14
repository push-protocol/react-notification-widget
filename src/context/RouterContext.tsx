import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  ElementType,
  useEffect,
} from 'react';
import { useAccount, useSigner } from 'wagmi';
import * as epns from '@epnsproject/sdk-restapi';
import { useEnvironment } from './EnvironmentContext';
import { EmailVerified, Feed, Settings, Subscribe, VerifyEmail, WalletDisconnected } from 'screens';
import { useChannelContext } from 'context/ChannelContext';
import { LOCALSTORAGE_AUTH_KEY, LOCALSTORAGE_AUTH_REFRESH_KEY } from 'global/const';
import { useAuthenticate } from 'hooks/auth/useAuthenticate';
import { Auth } from 'screens/auth';

enum Routes {
  Subscribe = 'Subscribe',
  Settings = 'Settings',
  ConnectEmail = 'ConnectEmail',
  NotificationsFeed = 'NotificationsFeed',
  VerifyEmail = 'VerifyEmail',
  EmailVerified = 'EmailVerified',
  WalletDisconnected = 'WalletDisconnected',
  Auth = 'Auth',
}

type RouterProps = {
  [key: string]: string;
};

type RouterContext = {
  activeRoute: Routes;
  subscribe(): void;
  unsubscribe(): void;
  setRoute(route: Routes, props?: RouterProps): void;
  Component: ElementType;
  props?: RouterProps;
  isLoading: boolean;
  error: boolean;
  isLoggedIn: boolean;
  login(callback?: () => void): void;
};

const RouterContext = createContext<RouterContext>({
  activeRoute: Routes.Subscribe,
} as RouterContext);

const isUserSubscribed = async (args: {
  userAddress: string;
  channelAddress: string;
  env: string;
  chainId: number;
}): Promise<boolean> => {
  const { userAddress, channelAddress, env, chainId } = args;
  const subbedChannels: { channel: string }[] = await epns.user.getSubscriptions({
    user: `eip155:${chainId}:${userAddress}`,
    env,
  });
  const subbedChannelsLower = subbedChannels.map((s) => s.channel.toLowerCase());
  return subbedChannelsLower.indexOf(channelAddress.toLowerCase()) !== -1;
};

const shouldLogin = () => {
  return !localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
};

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const { channelAddress } = useChannelContext();
  const { epnsEnv, chainId } = useEnvironment();
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();
  const { login: _login } = useAuthenticate();

  const [active, setActive] = useState(Routes.Subscribe);
  const [routerProps, setRouterProps] = useState<RouterProps>({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [error, setError] = useState(false);
  const [loginCallback, setLoginCallback] = useState<() => void>();

  useEffect(() => {
    if (!isConnected || !channelAddress) {
      return;
    }

    (async () => {
      setIsLoading(true);
      setIsSubscribed(
        await isUserSubscribed({
          userAddress: address as string,
          channelAddress,
          env: epnsEnv,
          chainId,
        })
      );
      setIsLoading(false);
    })();
  }, [channelAddress, address, isConnected]);

  useEffect(() => {
    if (!isConnected) {
      logout();
      setActive(Routes.WalletDisconnected);
      return;
    }

    if (!isSubscribed) {
      setActive(Routes.Subscribe);
      return;
    }

    if (!isLoggedIn && localStorage.getItem(LOCALSTORAGE_AUTH_KEY)) {
      setIsLoggedIn(true);
    }

    if (isFirstLogin) {
      setActive(Routes.ConnectEmail);
      return;
    }

    if (loginCallback) {
      loginCallback();
      setLoginCallback(undefined);
      return;
    }

    setActive(Routes.NotificationsFeed);
  }, [isConnected, isSubscribed, isFirstLogin, isLoggedIn]);

  const setRouteWithParams = (route: Routes, props?: RouterProps) => {
    setActive(route);
    if (props) setRouterProps(props);
  };

  const login = async (callback?: () => void) => {
    setIsLoading(true);
    setError(false);
    setActive(Routes.Auth);

    if (callback) {
      setLoginCallback(() => {
        return callback;
      });
    }

    try {
      const result = await _login(channelAddress);
      localStorage.setItem(LOCALSTORAGE_AUTH_KEY, result.token);
      localStorage.setItem(LOCALSTORAGE_AUTH_REFRESH_KEY, result.refreshToken);
      setIsLoggedIn(true);
    } catch (e) {
      setError(true);
    }

    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
    setIsSubscribed(false);
    setError(false);
    setIsLoading(false);
  };

  const toggleSubscription = async (action: 'sub' | 'unsub') => {
    setIsLoading(true);
    const params = {
      signer: signer as any,
      channelAddress: `eip155:${chainId}:${channelAddress}`,
      userAddress: `eip155:${chainId}:${address}`,
      env: epnsEnv,
    };

    const response =
      action == 'sub'
        ? await epns.channels.subscribe(params)
        : await epns.channels.unsubscribe(params);

    setIsLoading(false);

    if (response.status == 'success') {
      if (action === 'sub') setIsFirstLogin(true);
      setIsSubscribed(action === 'sub');
    }
  };

  const subscribe = () => toggleSubscription('sub');
  const unsubscribe = () => toggleSubscription('unsub');

  const RouteScreens = {
    [Routes.Subscribe]: Subscribe,
    [Routes.Settings]: Settings,
    [Routes.ConnectEmail]: Settings,
    [Routes.NotificationsFeed]: Feed,
    [Routes.VerifyEmail]: VerifyEmail,
    [Routes.EmailVerified]: EmailVerified,
    [Routes.WalletDisconnected]: WalletDisconnected,
    [Routes.Auth]: Auth,
  };

  return (
    <RouterContext.Provider
      value={{
        activeRoute: active,
        subscribe,
        unsubscribe,
        setRoute: setRouteWithParams,
        Component: RouteScreens[active],
        props: routerProps,
        isLoading,
        error,
        isLoggedIn,
        login,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

function useRouterContext() {
  return useContext(RouterContext);
}

export { Routes, RouterProvider, useRouterContext };
