import React, { createContext, useContext } from 'react';

export type EnvType = 'production' | 'staging' | 'dev';
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
    dev: 'http://localhost:4001/graphql',
    staging: 'https://hz4hx34vmj.execute-api.us-east-1.amazonaws.com/graphql', // TODO: change to correct endpoint
    production: 'https://hz4hx34vmj.execute-api.us-east-1.amazonaws.com/graphql', // TODO: change to correct endpoint
  };

  const chainIdMap: { [key in EnvType]: number } = {
    dev: 42,
    staging: 42,
    production: 1,
  };

  const epnsEnvMap: { [key in EnvType]: string } = {
    dev: 'staging',
    staging: 'staging',
    production: 'prod',
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
