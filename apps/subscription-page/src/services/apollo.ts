import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default apolloClient;
