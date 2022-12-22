import React, { createContext, useContext, ReactNode, useState, ElementType } from 'react';
import analytics from '../services/analytics';
import {
  Feed,
  Settings,
  Subscribe,
  ChannelAdded,
  SubscriptionFlowEnded,
  SetupChannels,
  SetupPreferences,
} from 'screens';

enum Routes {
  Subscribe = 'Subscribe',
  Settings = 'Settings',
  ChannelAdded = 'ChannelAdded',
  SetupChannels = 'SetupChannels',
  SetupPreferences = 'SetupPreferences',
  NotificationsFeed = 'NotificationsFeed',
  SubscriptionFlowEnded = 'SubscriptionFlowEnded',
}

type RouteProps = Record<string, any>;

type RouterContext = {
  feedOpen: boolean;
  setFeedOpen: (open: boolean) => void;
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

  const [feedOpen, setFeedOpen] = useState(false);

  const setRouteWithParams = (route: Routes, props?: RouteProps) => {
    analytics.track(`${route} page loaded`);
    setActive(route);

    props ? setRouteProps(props) : setRouteProps({});
  };

  const RouteScreens = {
    [Routes.Subscribe]: Subscribe,
    [Routes.Settings]: Settings,
    [Routes.NotificationsFeed]: Feed,
    [Routes.ChannelAdded]: ChannelAdded,
    [Routes.SetupChannels]: SetupChannels,
    [Routes.SubscriptionFlowEnded]: SubscriptionFlowEnded,
    [Routes.SetupPreferences]: SetupPreferences,
  };

  return (
    <RouterContext.Provider
      value={{
        activeRoute: active,
        routeProps,
        setRoute: setRouteWithParams,
        feedOpen,
        setFeedOpen,
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
