import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { PUBLIC_GQL_ENDPOINT, SIGNED_AUTH_KEY } from 'global/const';

const httpMainApiLink = new HttpLink({
  uri: PUBLIC_GQL_ENDPOINT,
});

const createTokenLink = () =>
  setContext(async () => {
    const authParams = localStorage.getItem(SIGNED_AUTH_KEY);

    return {
      headers: {
        ...(authParams && { 'x-signed-auth': authParams }),
      },
    };
  });

function removeToken() {
  localStorage.removeItem(SIGNED_AUTH_KEY);
}

const ErrorHandlingLink = onError(({ graphQLErrors }) => {
  const error = graphQLErrors?.[0];

  if (error?.extensions.code === 'INVALID_TOKEN') {
    removeToken();
  }
});

const createApolloClient = () => {
  const cache = new InMemoryCache();

  const withTokenLink = createTokenLink();

  return new ApolloClient({
    link: from([withTokenLink, ErrorHandlingLink, httpMainApiLink]),
    cache,
  });
};

const apolloClient = createApolloClient();
export { apolloClient };
