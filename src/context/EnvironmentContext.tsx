import React, { createContext, useContext } from 'react';

export type EnvType = 'production' | 'staging' | string;
export type EnvironmentContextType = {
  env: EnvType;
  chainId: number;
  gqlEndpoint: string;
  epnsEnv: string;
};

export const EnvironmentContext = createContext<EnvironmentContextType>(
  {} as EnvironmentContextType
);

export const EnvironmentProvider = ({
  env = 'production',
  children,
}: {
  env?: EnvType;
  children: React.ReactNode;
}) => {
  const gqlEndpointMap: { [key in EnvType]: string } = {
    development: 'http://localhost:4001/graphql',
    staging: 'https://staging-api.wherever.to/graphql',
    production: 'https://api.wherever.to/graphql',
  };

  const chainIdMap: { [key in EnvType]: number } = {
    development: 42,
    staging: 42,
    production: 1,
  };

  const epnsEnvMap: { [key in EnvType]: string } = {
    development: 'staging',
    staging: 'staging',
    production: 'prod',
  };

  return (
    <EnvironmentContext.Provider
      value={{
        env,
        chainId: chainIdMap[env],
        gqlEndpoint: gqlEndpointMap[process.env.WHEREVER_ENV || env],
        epnsEnv: epnsEnvMap[env],
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  return useContext(EnvironmentContext);
};
