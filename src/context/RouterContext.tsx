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
import { LOCALSTORAGE_AUTH_KEY } from 'global/const';
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
type RouteWithProps = { route: Routes; props?: RouterProps };

type RouterContext = {
  activeRoute: Routes;
  subscribe(): void;
  setRoute(route: Routes, props?: RouterProps): void;
  Component: ElementType;
  props?: RouterProps;
  isLoading: boolean;
  error: boolean;
  isLoggedIn: boolean;
  login(redirect?: RouteWithProps): void;
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
  let subscribers: string[] = await epns.channels._getSubscribers({
    channel: `eip155:${chainId}:${channelAddress}`,
    env: env,
  });
  subscribers = subscribers.map((s) => s.toLowerCase());
  return subscribers.indexOf(userAddress.toLowerCase()) !== -1;
};

const shouldLogin = () => {
  return !localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
};

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(Routes.Subscribe);
  const [routerProps, setRouterProps] = useState<RouterProps>({});
  const { isConnected, address } = useAccount();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { channel } = useChannelContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login: _login } = useAuthenticate();
  const [error, setError] = useState(false);
  const { epnsEnv, chainId } = useEnvironment();
  const { data: signer } = useSigner();
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<RouteWithProps>({
    route: Routes.NotificationsFeed,
    props: {},
  });

  useEffect(() => {
    if (!isConnected || !channel) {
      return;
    }

    (async () => {
      setIsLoading(true);
      setIsSubscribed(
        await isUserSubscribed({
          userAddress: address as string,
          channelAddress: channel,
          env: epnsEnv,
          chainId,
        })
      );
      setIsLoading(false);
    })();
  }, [channel, address, isConnected]);

  const setRouteAfterLogin = () => {
    if (!redirectAfterLogin || redirectAfterLogin.route == Routes.NotificationsFeed) {
      setActive(Routes.NotificationsFeed);
      setRouterProps({});
    }

    setActive(redirectAfterLogin.route);
    setRouterProps(redirectAfterLogin.props || {});
  };

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
      return;
    }

    setRouteAfterLogin();
  }, [isConnected, isSubscribed, isLoggedIn]);

  const setRouteWithParams = (route: Routes, props?: RouterProps) => {
    setActive(route);
    if (props) setRouterProps(props);
  };

  const login = async (redirect?: RouteWithProps) => {
    if (isLoggedIn || !shouldLogin()) return;
    setIsLoading(true);
    setError(false);
    setActive(Routes.Auth);

    try {
      if (redirect) {
        setRedirectAfterLogin(redirect);
      }

      const result = await _login(channel);
      localStorage.setItem(LOCALSTORAGE_AUTH_KEY, result.token);
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

  const subscribe = async () => {
    setIsLoading(true);
    const response = await epns.channels.subscribe({
      signer: signer as any,
      channelAddress: `eip155:${chainId}:${channel}`,
      userAddress: `eip155:${chainId}:${address}`,
      env: epnsEnv,
    });
    setIsLoading(false);

    if (response.status == 'success') {
      setIsSubscribed(true);
    }
  };

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
