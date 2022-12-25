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
  Auth,
} from 'screens';

enum Routes {
  Subscribe = 'Subscribe',
  Settings = 'Settings',
  ChannelAdded = 'ChannelAdded',
  SetupChannels = 'SetupChannels',
  SetupPreferences = 'SetupPreferences',
  NotificationsFeed = 'NotificationsFeed',
  SubscriptionFlowEnded = 'SubscriptionFlowEnded',
  Auth = 'Auth',
}

type RouteProps = Record<string, any>;

type RouterContext = {
  activeRoute: Routes;
  setRoute(route: Routes, props?: RouteProps): void;
  Component: ElementType;
  requiresAuth: boolean;
  routeProps: RouteProps;
  props?: RouteProps;
};

const RouterContext = createContext<RouterContext>({
  activeRoute: Routes.Subscribe,
} as RouterContext);

const RouteScreens = {
  [Routes.Subscribe]: {
    component: Subscribe,
    requiresAuth: false,
  },
  [Routes.Settings]: {
    component: Settings,
    requiresAuth: true,
  },
  [Routes.NotificationsFeed]: {
    component: Feed,
    requiresAuth: true,
  },
  [Routes.ChannelAdded]: {
    component: ChannelAdded,
    requiresAuth: false,
  },
  [Routes.SetupChannels]: {
    component: SetupChannels,
    requiresAuth: false,
  },
  [Routes.SubscriptionFlowEnded]: {
    component: SubscriptionFlowEnded,
    requiresAuth: false,
  },
  [Routes.SetupPreferences]: {
    component: SetupPreferences,
    requiresAuth: false,
  },
  [Routes.Auth]: {
    component: Auth,
    requiresAuth: false,
  },
};

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(Routes.Subscribe);
  const [routeProps, setRouteProps] = useState<RouteProps>({});

  const setRouteWithParams = (route: Routes, props?: RouteProps) => {
    analytics.track(`${route} page loaded`);
    setActive(route);

    props ? setRouteProps(props) : setRouteProps({});
  };

  return (
    <RouterContext.Provider
      value={{
        activeRoute: active,
        routeProps,
        setRoute: setRouteWithParams,
        Component: RouteScreens[active].component,
        requiresAuth: RouteScreens[active].requiresAuth,
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
