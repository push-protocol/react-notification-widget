import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type PartnerInfoQueryVariables = Types.Exact<{
  input: Types.PartnerInfoInput;
}>;


export type PartnerInfoQuery = { __typename?: 'Query', partnerInfo: { __typename?: 'CommsChannel', id: string, channelAddress: string, logo?: string | null, name: string, chainId: number, discordGuildUrl?: string | null } };

export type UserPreferenceCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserPreferenceCategoriesQuery = { __typename?: 'Query', commsChannelTags: Array<{ __typename?: 'CommsChannelTag', id: string, name: string, userPreferences: Array<{ __typename?: 'UserPreference', id: string, discord: boolean, email: boolean, telegram: boolean }> }> };


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
    userPreferences {
      id
      discord
      email
      telegram
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