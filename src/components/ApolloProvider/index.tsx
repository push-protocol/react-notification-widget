import { ApolloProvider as Apollo } from '@apollo/client';
import React, { useMemo } from 'react';
import { useEnvironment } from '../../context/EnvironmentContext';
import { getApolloClient } from '../../services/apolloClient';

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const { gqlEndpoint } = useEnvironment();

  const apolloClient = useMemo(() => {
    return getApolloClient({ endpoint: gqlEndpoint });
  }, [gqlEndpoint]);

  return <Apollo client={apolloClient}>{children}</Apollo>;
};
