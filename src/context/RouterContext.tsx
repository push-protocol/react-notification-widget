import React, { createContext, useContext, ReactNode, useState, ElementType } from 'react';
import analytics from '../services/analytics';
import { ChannelAdded } from '../screens/channelAdded';
import { Feed, Settings, Subscribe } from 'screens';

enum Routes {
  Subscribe = 'Subscribe',
  Settings = 'Settings',
  ChannelAdded = 'ChannelAdded',
  ConnectEmail = 'ConnectEmail',
  NotificationsFeed = 'NotificationsFeed',
  EmailVerify = 'EmailVerify',
}

type RouteProps = Record<string, any>;

type RouterContext = {
  activeRoute: Routes;
  setRoute(route: Routes, props?: RouteProps): void;
  Component: ElementType;
  routeProps: RouteProps;
  props?: RouteProps;
};

const RouterContext = createContext<RouterContext>({
  activeRoute: Routes.Subscribe,
} as RouterContext);

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(Routes.Subscribe);
  const [routeProps, setRouteProps] = useState<RouteProps>({});

  const setRouteWithParams = (route: Routes, props?: RouteProps) => {
    analytics.track(`${route} page loaded`);
    setActive(route);

    props ? setRouteProps(props) : setRouteProps({});
  };

  const RouteScreens = {
    [Routes.Subscribe]: Subscribe,
    [Routes.Settings]: Settings,
    [Routes.ConnectEmail]: Settings,
    [Routes.NotificationsFeed]: Feed,
    [Routes.EmailVerify]: Settings,
    [Routes.ChannelAdded]: ChannelAdded,
  };

  return (
    <RouterContext.Provider
      value={{
        activeRoute: active,
        routeProps,
        setRoute: setRouteWithParams,
        Component: RouteScreens[active],
        props: routeProps,
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
