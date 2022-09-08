import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type UserCommunicationChannelsQueryVariables = Types.Exact<{
  address: Types.Scalars['String'];
}>;


export type UserCommunicationChannelsQuery = { __typename?: 'Query', userCommunicationChannels: { __typename?: 'UserCommunicationChannelsPayload', email: { __typename?: 'UserCommunicationChannel', exists: boolean, hint?: string | null } } };


export const UserCommunicationChannelsDocument = gql`
    query UserCommunicationChannels($address: String!) {
  userCommunicationChannels(address: $address) {
    email {
      exists
      hint
    }
  }
}
    `;

/**
 * __useUserCommunicationChannelsQuery__
 *
 * To run a query within a React component, call `useUserCommunicationChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCommunicationChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCommunicationChannelsQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useUserCommunicationChannelsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UserCommunicationChannelsQuery, UserCommunicationChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserCommunicationChannelsQuery, UserCommunicationChannelsQueryVariables>(UserCommunicationChannelsDocument, options);
      }
export function useUserCommunicationChannelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserCommunicationChannelsQuery, UserCommunicationChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserCommunicationChannelsQuery, UserCommunicationChannelsQueryVariables>(UserCommunicationChannelsDocument, options);
        }
export type UserCommunicationChannelsQueryHookResult = ReturnType<typeof useUserCommunicationChannelsQuery>;
export type UserCommunicationChannelsLazyQueryHookResult = ReturnType<typeof useUserCommunicationChannelsLazyQuery>;
export type UserCommunicationChannelsQueryResult = ApolloReactCommon.QueryResult<UserCommunicationChannelsQuery, UserCommunicationChannelsQueryVariables>;