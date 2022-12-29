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
import { WIDGET_VERSION } from 'global/const';
import authStorage from 'services/authStorage';

let apolloClient: ApolloClient<any>;

const getReqHeaders = () => {
  const authParams = authStorage.getAuth()?.token;

  return {
    'x-widget-version': WIDGET_VERSION,
    ...(authParams && { Authorization: `Bearer ${authParams}` }),
  };
};

const refreshToken = async () => {
  const currentRefreshToken = authStorage.getAuth()?.refreshToken;

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

  authStorage.updateUserTokens(token, newRefreshToken);

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
      authStorage.resetActiveKeys();
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
