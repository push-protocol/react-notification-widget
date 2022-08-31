import React, { createContext, useContext, ReactNode, useState, ElementType } from 'react';
import { EmailVerified, Feed, Settings, Subscribe, VerifyEmail, WalletDisconnected } from 'screens';

enum Routes {
  Subscribe = 'Subscribe',
  Settings = 'Settings',
  NotificationsFeed = 'NotificationsFeed',
  VerifyEmail = 'VerifyEmail',
  EmailVerified = 'EmailVerified',
  WalletDisconnected = 'WalletDisconnected',
}

type RouterContext = {
  activeRoute: Routes;
  setRoute(route: Routes): void;
  Component: ElementType;
};

const RouterContext = createContext<RouterContext>({
  activeRoute: Routes.Subscribe,
} as RouterContext);

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(Routes.Subscribe);

  const handleChangeRoute = (route: Routes) => {
    setActive(route);
  };

  const RouteScreens = {
    [Routes.Subscribe]: Subscribe,
    [Routes.Settings]: Settings,
    [Routes.NotificationsFeed]: Feed,
    [Routes.VerifyEmail]: VerifyEmail,
    [Routes.EmailVerified]: EmailVerified,
    [Routes.WalletDisconnected]: WalletDisconnected,
  };

  return (
    <RouterContext.Provider
      value={{
        activeRoute: active,
        setRoute: handleChangeRoute,
        Component: RouteScreens[active],
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
