import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  Observable,
  FetchResult,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { LOCALSTORAGE_AUTH_KEY, LOCALSTORAGE_AUTH_REFRESH_KEY } from 'global/const';

export const getApolloClient = ({ endpoint }: { endpoint: string }) => {
  const httpMainApiLink = new HttpLink({
    uri: endpoint,
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
    localStorage.removeItem(LOCALSTORAGE_AUTH_REFRESH_KEY);
  }

  const ErrorHandlingLink = onError(({ graphQLErrors, operation, forward }) => {
    const error = graphQLErrors?.[0];

    if (error?.extensions.code == 'INVALID_TOKEN') {
      removeToken();
      return;
    }

    if (error?.extensions.code == 'UNAUTHENTICATED') {
      if (operation.operationName == 'refreshToken') return;

      const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
        // used an annonymous function for using an async function
        (async () => {
          try {
            await refreshToken();

            // Retry the failed request
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            };

            forward(operation).subscribe(subscriber);
          } catch (err) {
            observer.error(err);
          }
        })();
      });

      return observable;
    }
  });

  const refreshToken = async () => {
    const REFRESH_TOKEN = gql`
      mutation refreshToken($input: RefreshTokenInput!) {
        refreshToken(input: $input) {
          token
          refreshToken
        }
      }
    `;

    const response = await apolloClient.mutate({
      mutation: REFRESH_TOKEN,
      variables: {
        input: {
          refreshToken: localStorage.getItem(LOCALSTORAGE_AUTH_REFRESH_KEY),
        },
      },
    });

    const token = response.data?.refreshToken.token;
    const refreshToken = response.data?.refreshToken.refreshToken;

    localStorage.setItem(LOCALSTORAGE_AUTH_KEY, token);
    localStorage.setItem(LOCALSTORAGE_AUTH_REFRESH_KEY, refreshToken);
  };

  const createApolloClient = () => {
    const cache = new InMemoryCache();

    const withTokenLink = createTokenLink();

    return new ApolloClient({
      link: from([withTokenLink, ErrorHandlingLink, httpMainApiLink]),
      cache,
    });
  };

  const apolloClient = createApolloClient();
  return apolloClient;
};
