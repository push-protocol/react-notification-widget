import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type GetPartnerInfoQueryVariables = Types.Exact<{
  input: Types.PartnerInfoInput;
}>;


export type GetPartnerInfoQuery = { __typename?: 'Query', partnerInfo: { __typename?: 'PartnerInfo', id: string, name: string, partnerApiKey: string } };


export const GetPartnerInfoDocument = gql`
    query GetPartnerInfo($input: PartnerInfoInput!) {
  partnerInfo(input: $input) {
    id
    name
    partnerApiKey
  }
}
    `;

/**
 * __useGetPartnerInfoQuery__
 *
 * To run a query within a React component, call `useGetPartnerInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerInfoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPartnerInfoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPartnerInfoQuery, GetPartnerInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPartnerInfoQuery, GetPartnerInfoQueryVariables>(GetPartnerInfoDocument, options);
      }
export function useGetPartnerInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPartnerInfoQuery, GetPartnerInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPartnerInfoQuery, GetPartnerInfoQueryVariables>(GetPartnerInfoDocument, options);
        }
export type GetPartnerInfoQueryHookResult = ReturnType<typeof useGetPartnerInfoQuery>;
export type GetPartnerInfoLazyQueryHookResult = ReturnType<typeof useGetPartnerInfoLazyQuery>;
export type GetPartnerInfoQueryResult = ApolloReactCommon.QueryResult<GetPartnerInfoQuery, GetPartnerInfoQueryVariables>;