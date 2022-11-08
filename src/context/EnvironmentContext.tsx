import React, { createContext, useContext } from 'react';

export type EnvType = 'production' | 'staging' | string;
export type EnvironmentContextType = {
  gqlEndpoint: string;
  epnsEnv: string;
};

export const EnvironmentContext = createContext<EnvironmentContextType>(
  {} as EnvironmentContextType
);

export const EnvironmentProvider = ({ children }: { env?: EnvType; children: React.ReactNode }) => {
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
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  return useContext(EnvironmentContext);
};
