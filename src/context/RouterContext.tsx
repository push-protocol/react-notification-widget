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
import { EmailVerified, Feed, Settings, Subscribe, VerifyEmail, WalletDisconnected } from 'screens';
import { useChannelContext } from 'context/ChannelContext';
import { CHAIN_ID, ENV, LOCALSTORAGE_AUTH_KEY } from 'global/const';
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
  setRoute(route: Routes): void;
  setRouteProps(props: RouterProps): void;
  Component: ElementType;
  props?: RouterProps;
  isLoading: boolean;
  error: boolean;
  login(): void;
};

const RouterContext = createContext<RouterContext>({
  activeRoute: Routes.Subscribe,
} as RouterContext);

const isUserSubscribed = async (userAddress: string, channelAddress: string): Promise<boolean> => {
  const subscribers: string[] = await epns.channels._getSubscribers({
    channel: `eip155:${CHAIN_ID}:${channelAddress}`,
    env: ENV,
  });
  return subscribers.indexOf(userAddress) !== -1;
};

const shouldLogin = () => {
  return !localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
};

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(Routes.Subscribe);
  const [routerProps, setRouterProps] = useState<RouterProps>({});
  const { isConnected, address } = useAccount();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addr } = useChannelContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login: _login } = useAuthenticate();
  const [error, setError] = useState(false);

  const { data: signer } = useSigner();

  useEffect(() => {
    if (!isConnected || !addr) {
      return;
    }

    (async () => {
      setIsLoading(true);
      setIsSubscribed(await isUserSubscribed(address as string, addr));
      setIsLoading(false);
    })();
  }, [addr, address, isConnected]);

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

    // if (!isLoggedIn && isSubscribed && shouldLogin()) {
    //   setActive(Routes.Auth);
    //   login();
    //   return;
    // }

    if (!isLoggedIn && localStorage.getItem(LOCALSTORAGE_AUTH_KEY)) {
      setIsLoggedIn(true);
      return;
    }

    setActive(Routes.NotificationsFeed);
  }, [isConnected, isSubscribed, isLoggedIn]);

  const handleChangeRoute = (route: Routes) => {
    setActive(route);
  };

  const handleChangeRouterProps = (props: RouterProps) => {
    setRouterProps(props);
  };

  const login = async () => {
    if (isLoggedIn || !shouldLogin()) return;
    setIsLoading(true);
    setError(false);
    setActive(Routes.Auth);

    try {
      const result = await _login(addr);
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
      channelAddress: `eip155:${CHAIN_ID}:${addr}`,
      userAddress: `eip155:${CHAIN_ID}:${address}`,
      env: ENV,
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
        setRoute: handleChangeRoute,
        setRouteProps: handleChangeRouterProps,
        Component: RouteScreens[active],
        props: routerProps,
        isLoading,
        error,
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
