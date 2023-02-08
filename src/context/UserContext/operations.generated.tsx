import * as Types from 'global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type UserCommunicationChannelsQueryVariables = Types.Exact<{
  address: Types.Scalars['String'];
}>;


export type UserCommunicationChannelsQuery = { __typename?: 'Query', userCommunicationChannels: { __typename?: 'UserCommunicationChannelsPayload', email: { __typename?: 'UserCommunicationChannel', exists: boolean, hint?: string | null }, telegram: { __typename?: 'UserCommunicationChannel', exists: boolean, hint?: string | null }, discord: { __typename?: 'UserCommunicationChannel', exists: boolean, hint?: string | null } } };

export type UserInfoFragment = { __typename?: 'User', id: string, lastReadAt: any, preferences: Array<{ __typename?: 'UserPreference', id: string, commsChannelTagId: string, email: boolean, telegram: boolean, discord: boolean, enabled: boolean }> };

export type GetUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, lastReadAt: any, preferences: Array<{ __typename?: 'UserPreference', id: string, commsChannelTagId: string, email: boolean, telegram: boolean, discord: boolean, enabled: boolean }> } };

export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  lastReadAt
  preferences {
    id
    commsChannelTagId
    email
    telegram
    discord
    enabled
  }
}
    `;
export const UserCommunicationChannelsDocument = gql`
    query UserCommunicationChannels($address: String!) {
  userCommunicationChannels(address: $address) {
    email {
      exists
      hint
    }
    telegram {
      exists
      hint
    }
    discord {
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
export const GetUserDocument = gql`
    query GetUser {
  user {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
