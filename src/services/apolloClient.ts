import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { PUBLIC_GQL_ENDPOINT, LOCALSTORAGE_AUTH_KEY } from 'global/const';

const httpMainApiLink = new HttpLink({
  uri: PUBLIC_GQL_ENDPOINT,
});

const createTokenLink = () =>
  setContext(async () => {
    const authParams = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

    return {
      headers: {
        ...(authParams && { Authorization: `Bearer ${authParams}` }),
      },
    };
  });

function removeToken() {
  localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
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
