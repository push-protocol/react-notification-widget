import React, { createContext, useContext, ReactNode, useState, ElementType } from 'react';
import analytics from '../services/analytics';
import { Feed, Settings, Subscribe } from 'screens';

enum Routes {
  Subscribe = 'Subscribe',
  Settings = 'Settings',
  ConnectEmail = 'ConnectEmail',
  NotificationsFeed = 'NotificationsFeed',
  EmailVerify = 'EmailVerify',
  WalletDisconnected = 'WalletDisconnected',
}

type RouterProps = {
  [key: string]: string;
};

type RouterContext = {
  activeRoute: Routes;
  setRoute(route: Routes, props?: RouterProps): void;
  Component: ElementType;
  props?: RouterProps;
};

const RouterContext = createContext<RouterContext>({
  activeRoute: Routes.Subscribe,
} as RouterContext);

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(Routes.Subscribe);
  const [routerProps, setRouterProps] = useState<RouterProps>({});

  const setRouteWithParams = (route: Routes, props?: RouterProps) => {
    analytics.track(`${route} page loaded`);
    setActive(route);
    if (props) setRouterProps(props);
  };

  const RouteScreens = {
    [Routes.Subscribe]: Subscribe,
    [Routes.Settings]: Settings,
    [Routes.ConnectEmail]: Settings,
    [Routes.NotificationsFeed]: Feed,
    [Routes.EmailVerify]: Settings,
    [Routes.WalletDisconnected]: Subscribe,
  };

  return (
    <RouterContext.Provider
      value={{
        activeRoute: active,
        setRoute: setRouteWithParams,
        Component: RouteScreens[active],
        props: routerProps,
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
