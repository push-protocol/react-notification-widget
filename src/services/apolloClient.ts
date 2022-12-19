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
import { LOCALSTORAGE_AUTH_KEY, LOCALSTORAGE_AUTH_REFRESH_KEY, WIDGET_VERSION } from 'global/const';

let apolloClient: ApolloClient<any>;

function removeTokens() {
  localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
  localStorage.removeItem(LOCALSTORAGE_AUTH_REFRESH_KEY);
}

const getReqHeaders = () => {
  const authParams = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

  return {
    'x-widget-version': WIDGET_VERSION,
    ...(authParams && { Authorization: `Bearer ${authParams}` }),
  };
};

const refreshToken = async () => {
  const currentRefreshToken = localStorage.getItem(LOCALSTORAGE_AUTH_REFRESH_KEY);

  if (!currentRefreshToken) {
    return false;
  }

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
        refreshToken: currentRefreshToken,
      },
    },
  });

  const token = response.data?.refreshToken.token;
  const newRefreshToken = response.data?.refreshToken.refreshToken;

  localStorage.setItem(LOCALSTORAGE_AUTH_KEY, token);
  localStorage.setItem(LOCALSTORAGE_AUTH_REFRESH_KEY, newRefreshToken);

  return true;
};

export const getApolloClient = ({ endpoint }: { endpoint: string }) => {
  if (apolloClient) {
    return apolloClient;
  }

  const httpMainApiLink = new HttpLink({
    uri: endpoint,
  });

  const createTokenLink = () =>
    setContext(async () => {
      return {
        headers: getReqHeaders(),
      };
    });

  const ErrorHandlingLink = onError(({ graphQLErrors, operation, forward }) => {
    const error = graphQLErrors?.[0];

    if (error?.extensions.code == 'INVALID_TOKEN') {
      removeTokens();
      return;
    }

    if (error?.extensions.code == 'UNAUTHENTICATED') {
      if (operation.operationName == 'refreshToken') return;

      const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
        // anonymous function used to allow async
        (async () => {
          try {
            const fetchedNewToken = await refreshToken();

            if (!fetchedNewToken) {
              return;
            }

            // reset auth header after refresh
            operation.setContext(() => ({ headers: getReqHeaders() }));

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

  const createApolloClient = () => {
    const cache = new InMemoryCache();

    const withTokenLink = createTokenLink();

    return new ApolloClient({
      link: from([withTokenLink, ErrorHandlingLink, httpMainApiLink]),
      cache,
    });
  };

  apolloClient = createApolloClient();
  return apolloClient;
};
