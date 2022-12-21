import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type PartnerInfoQueryVariables = Types.Exact<{
  input: Types.PartnerInfoInput;
}>;


export type PartnerInfoQuery = { __typename?: 'Query', partnerInfo: { __typename?: 'PartnerInfo', id: string, channelAddress: string, logo?: string | null, name: string, chainId: number, discordGuildUrl?: string | null } };

export type UserPreferenceCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserPreferenceCategoriesQuery = { __typename?: 'Query', commsChannelTags: Array<{ __typename?: 'CommsChannelTag', id: string, name: string, userPreference: { __typename?: 'UserPreference', id: string, discord: boolean, email: boolean, telegram: boolean, enabled: boolean } }> };

export type UserPreferencesUpdateMutationVariables = Types.Exact<{
  input: Types.UserPreferenceUpdateInput;
}>;


export type UserPreferencesUpdateMutation = { __typename?: 'Mutation', userPreferencesUpdate: { __typename?: 'UserPreference', id: string, commsChannelTagId: string, email: boolean, telegram: boolean, discord: boolean, enabled: boolean } };


export const PartnerInfoDocument = gql`
    query PartnerInfo($input: PartnerInfoInput!) {
  partnerInfo(input: $input) {
    id
    channelAddress
    logo
    name
    chainId
    discordGuildUrl
  }
}
    `;

/**
 * __usePartnerInfoQuery__
 *
 * To run a query within a React component, call `usePartnerInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerInfoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePartnerInfoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PartnerInfoQuery, PartnerInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PartnerInfoQuery, PartnerInfoQueryVariables>(PartnerInfoDocument, options);
      }
export function usePartnerInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PartnerInfoQuery, PartnerInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PartnerInfoQuery, PartnerInfoQueryVariables>(PartnerInfoDocument, options);
        }
export type PartnerInfoQueryHookResult = ReturnType<typeof usePartnerInfoQuery>;
export type PartnerInfoLazyQueryHookResult = ReturnType<typeof usePartnerInfoLazyQuery>;
export type PartnerInfoQueryResult = ApolloReactCommon.QueryResult<PartnerInfoQuery, PartnerInfoQueryVariables>;
export const UserPreferenceCategoriesDocument = gql`
    query UserPreferenceCategories {
  commsChannelTags {
    id
    name
    userPreference {
      id
      discord
      email
      telegram
      enabled
    }
  }
}
    `;

/**
 * __useUserPreferenceCategoriesQuery__
 *
 * To run a query within a React component, call `useUserPreferenceCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPreferenceCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPreferenceCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserPreferenceCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserPreferenceCategoriesQuery, UserPreferenceCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserPreferenceCategoriesQuery, UserPreferenceCategoriesQueryVariables>(UserPreferenceCategoriesDocument, options);
      }
export function useUserPreferenceCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserPreferenceCategoriesQuery, UserPreferenceCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserPreferenceCategoriesQuery, UserPreferenceCategoriesQueryVariables>(UserPreferenceCategoriesDocument, options);
        }
export type UserPreferenceCategoriesQueryHookResult = ReturnType<typeof useUserPreferenceCategoriesQuery>;
export type UserPreferenceCategoriesLazyQueryHookResult = ReturnType<typeof useUserPreferenceCategoriesLazyQuery>;
export type UserPreferenceCategoriesQueryResult = ApolloReactCommon.QueryResult<UserPreferenceCategoriesQuery, UserPreferenceCategoriesQueryVariables>;
export const UserPreferencesUpdateDocument = gql`
    mutation UserPreferencesUpdate($input: UserPreferenceUpdateInput!) {
  userPreferencesUpdate(input: $input) {
    id
    commsChannelTagId
    email
    telegram
    discord
    enabled
  }
}
    `;
export type UserPreferencesUpdateMutationFn = ApolloReactCommon.MutationFunction<UserPreferencesUpdateMutation, UserPreferencesUpdateMutationVariables>;

/**
 * __useUserPreferencesUpdateMutation__
 *
 * To run a mutation, you first call `useUserPreferencesUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPreferencesUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPreferencesUpdateMutation, { data, loading, error }] = useUserPreferencesUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserPreferencesUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserPreferencesUpdateMutation, UserPreferencesUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UserPreferencesUpdateMutation, UserPreferencesUpdateMutationVariables>(UserPreferencesUpdateDocument, options);
      }
export type UserPreferencesUpdateMutationHookResult = ReturnType<typeof useUserPreferencesUpdateMutation>;
export type UserPreferencesUpdateMutationResult = ApolloReactCommon.MutationResult<UserPreferencesUpdateMutation>;
export type UserPreferencesUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<UserPreferencesUpdateMutation, UserPreferencesUpdateMutationVariables>;