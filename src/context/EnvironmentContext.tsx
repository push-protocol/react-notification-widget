import React, { createContext, useContext } from 'react';

export type EnvType = 'production' | 'staging' | string;
export enum WidgetMode {
  Default = 'Default',
  subscribeOnly = 'subscribeOnly',
}

export type EnvironmentContextType = {
  gqlEndpoint: string;
  epnsEnv: string;
  isSubscribeOnly: boolean;
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
    development: 'http://localhost:4001/graphql',
    staging: 'https://staging-api.wherever.to/graphql',
    production: 'https://api.wherever.to/graphql',
  };

  const epnsEnvMap: { [key in EnvType]: string } = {
    development: 'staging',
    staging: 'staging',
    production: 'prod',
  };

  const whereverEnv = process.env.WHEREVER_ENV as string;

  return (
    <EnvironmentContext.Provider
      value={{
        gqlEndpoint: gqlEndpointMap[whereverEnv],
        epnsEnv: epnsEnvMap[whereverEnv],
        isSubscribeOnly: mode === WidgetMode.subscribeOnly,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  return useContext(EnvironmentContext);
};
