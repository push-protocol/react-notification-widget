import React, { createContext, useContext, ReactNode, useState } from 'react';
import analytics from '../../services/analytics';
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
  const [active, setActive] = useState(Routes.Subscribe);
  const [routeProps, setRouteProps] = useState<RouteProps>({});

  const setRouteWithParams = (route: Routes, props?: RouteProps) => {
    setActive(route);

    props ? setRouteProps(props) : setRouteProps({});
  };

  return (
    <RouterContext.Provider
      value={{
        activeRoute: RouteConfig[active],
        routeProps,
        setRoute: setRouteWithParams,
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
