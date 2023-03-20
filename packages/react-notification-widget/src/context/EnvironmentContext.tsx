import React, { createContext, useContext } from "react";
import { ENV } from "../global/const";

export type EnvType = "production" | "staging" | string;
export enum WidgetMode {
  Default = "Default",
  SubscribeOnly = "SubscribeOnly",
}

export type EnvironmentContextType = {
  gqlEndpoint: string;
  epnsEnv: string;
  isSubscribeOnlyMode: boolean;
};

export const EnvironmentContext = createContext<EnvironmentContextType>(
  {} as EnvironmentContextType
);

export const EnvironmentProvider = ({
  children,
  mode,
}: {
  env?: EnvType;
  children: React.ReactNode;
  mode?: WidgetMode;
}) => {
  const gqlEndpointMap: { [key in EnvType]: string } = {
    development: "http://localhost:4001/graphql",
    staging: "https://staging-api.wherever.im/graphql",
    production: "https://api.wherever.im/graphql",
  };

  const epnsEnvMap: { [key in EnvType]: string } = {
    development: "staging",
    staging: "staging",
    production: "prod",
  };

  const whereverEnv = ENV as string;

  return (
    <EnvironmentContext.Provider
      value={{
        gqlEndpoint: gqlEndpointMap[whereverEnv],
        epnsEnv: epnsEnvMap[whereverEnv],
        isSubscribeOnlyMode: mode === WidgetMode.SubscribeOnly,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  return useContext(EnvironmentContext);
};
