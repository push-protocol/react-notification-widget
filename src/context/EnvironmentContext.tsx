import React, { createContext, useContext } from 'react';

export type EnvType = 'prod' | 'staging' | 'dev';
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
  env,
  children,
}: {
  env?: EnvType;
  children: React.ReactNode;
}) => {
  env = env || 'prod';
  const gqlEndpointMap: { [key in EnvType]: string } = {
    dev: 'http://localhost:4001/graphql',
    staging: 'http://localhost:4001/graphql', // TODO: change to correct endpoint
    prod: 'http://localhost:4001/graphql', // TODO: change to correct endpoint
  };

  const chainIdMap: { [key in EnvType]: number } = {
    dev: 42,
    staging: 42,
    prod: 1,
  };

  const epnsEnvMap: { [key in EnvType]: string } = {
    dev: 'staging',
    staging: 'staging',
    prod: 'prod',
  };

  return (
    <EnvironmentContext.Provider
      value={{
        env: env,
        chainId: chainIdMap[env],
        gqlEndpoint: gqlEndpointMap[env],
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
