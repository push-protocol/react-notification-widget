import { ApolloProvider as Apollo } from "@apollo/client";
import { ReactNode, useMemo } from "react";
import { getApolloClient } from "services/apolloClient";
import { useEnvironment } from "context/EnvironmentContext";

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  const { gqlEndpoint } = useEnvironment();

  const apolloClient = useMemo(() => {
    return getApolloClient({ endpoint: gqlEndpoint });
  }, [gqlEndpoint]);

  return <Apollo client={apolloClient}>{children}</Apollo>;
};
