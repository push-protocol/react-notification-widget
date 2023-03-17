import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type UnsubscribeMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.UserUnsubscribeFromChannelInput>;
}>;


export type UnsubscribeMutation = { __typename?: 'Mutation', userUnsubscribeFromChannel: { __typename?: 'User', id: string } };

export type GetUserSubscriptionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserSubscriptionsQuery = { __typename?: 'Query', userSubscriptions: Array<{ __typename?: 'UserSubscription', name: string, id: string, address: string, icon?: string | null, source: Types.UserSubscriptionSource, commsChannelTags?: Array<{ __typename?: 'CommsChannelTag', id: string, name: string, description?: string | null }> | null }> };

export type ChannelsDiscoveryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ChannelsDiscoveryQuery = { __typename?: 'Query', commsChannelDiscover: Array<{ __typename?: 'CommsChannelDiscovered', id: number, subscriberCount?: number | null, address: string, description?: string | null, icon?: string | null, name: string, url?: string | null }> };


export const UnsubscribeDocument = gql`
    mutation Unsubscribe($input: UserUnsubscribeFromChannelInput) {
  userUnsubscribeFromChannel(input: $input) {
    id
  }
}
    `;
export type UnsubscribeMutationFn = ApolloReactCommon.MutationFunction<UnsubscribeMutation, UnsubscribeMutationVariables>;

/**
 * __useUnsubscribeMutation__
 *
 * To run a mutation, you first call `useUnsubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeMutation, { data, loading, error }] = useUnsubscribeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnsubscribeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnsubscribeMutation, UnsubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnsubscribeMutation, UnsubscribeMutationVariables>(UnsubscribeDocument, options);
      }
export type UnsubscribeMutationHookResult = ReturnType<typeof useUnsubscribeMutation>;
export type UnsubscribeMutationResult = ApolloReactCommon.MutationResult<UnsubscribeMutation>;
export type UnsubscribeMutationOptions = ApolloReactCommon.BaseMutationOptions<UnsubscribeMutation, UnsubscribeMutationVariables>;
export const GetUserSubscriptionsDocument = gql`
    query GetUserSubscriptions {
  userSubscriptions {
    name
    id
    address
    icon
    source
    commsChannelTags {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useGetUserSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetUserSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSubscriptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserSubscriptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserSubscriptionsQuery, GetUserSubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserSubscriptionsQuery, GetUserSubscriptionsQueryVariables>(GetUserSubscriptionsDocument, options);
      }
export function useGetUserSubscriptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserSubscriptionsQuery, GetUserSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserSubscriptionsQuery, GetUserSubscriptionsQueryVariables>(GetUserSubscriptionsDocument, options);
        }
export type GetUserSubscriptionsQueryHookResult = ReturnType<typeof useGetUserSubscriptionsQuery>;
export type GetUserSubscriptionsLazyQueryHookResult = ReturnType<typeof useGetUserSubscriptionsLazyQuery>;
export type GetUserSubscriptionsQueryResult = ApolloReactCommon.QueryResult<GetUserSubscriptionsQuery, GetUserSubscriptionsQueryVariables>;
export const ChannelsDiscoveryDocument = gql`
    query ChannelsDiscovery {
  commsChannelDiscover {
    id
    subscriberCount
    address
    description
    icon
    name
    url
  }
}
    `;

/**
 * __useChannelsDiscoveryQuery__
 *
 * To run a query within a React component, call `useChannelsDiscoveryQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsDiscoveryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsDiscoveryQuery({
 *   variables: {
 *   },
 * });
 */
export function useChannelsDiscoveryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChannelsDiscoveryQuery, ChannelsDiscoveryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ChannelsDiscoveryQuery, ChannelsDiscoveryQueryVariables>(ChannelsDiscoveryDocument, options);
      }
export function useChannelsDiscoveryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChannelsDiscoveryQuery, ChannelsDiscoveryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ChannelsDiscoveryQuery, ChannelsDiscoveryQueryVariables>(ChannelsDiscoveryDocument, options);
        }
export type ChannelsDiscoveryQueryHookResult = ReturnType<typeof useChannelsDiscoveryQuery>;
export type ChannelsDiscoveryLazyQueryHookResult = ReturnType<typeof useChannelsDiscoveryLazyQuery>;
export type ChannelsDiscoveryQueryResult = ApolloReactCommon.QueryResult<ChannelsDiscoveryQuery, ChannelsDiscoveryQueryVariables>;