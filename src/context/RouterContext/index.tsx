import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Routes, RouteConfig, Route } from './consts';

type RouteProps = Record<string, any>;

type RouterContext = {
  activeRoute: Route;
  setRoute(route: Routes, props?: RouteProps): void;
  routeProps: RouteProps;
};

const RouterContext = createContext<RouterContext>({
  activeRoute: RouteConfig[Routes.Subscribe],
  routeProps: {},
  setRoute() {
    return;
  },
} as RouterContext);

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(Routes.ConnectWallet);
  const [routeProps, setRouteProps] = useState<RouteProps>({});

  const setRoute = (route: Routes, props?: RouteProps) => {
    setActive(route);
    setRouteProps(props || {});
  };

  return (
    <RouterContext.Provider
      value={{
        activeRoute: RouteConfig[active],
        routeProps,
        setRoute,
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
