import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type CommsChannelQueryVariables = Types.Exact<{
  input: Types.CommsChannelByPartnerKeyInput;
}>;


export type CommsChannelQuery = { __typename?: 'Query', commsChannelByPartnerKey: { __typename?: 'CommsChannel', id: string, channelAddress: string, logo?: string | null, name: string } };


export const CommsChannelDocument = gql`
    query CommsChannel($input: CommsChannelByPartnerKeyInput!) {
  commsChannelByPartnerKey(input: $input) {
    id
    channelAddress
    logo
    name
  }
}
    `;

/**
 * __useCommsChannelQuery__
 *
 * To run a query within a React component, call `useCommsChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommsChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommsChannelQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommsChannelQuery(baseOptions: ApolloReactHooks.QueryHookOptions<CommsChannelQuery, CommsChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CommsChannelQuery, CommsChannelQueryVariables>(CommsChannelDocument, options);
      }
export function useCommsChannelLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommsChannelQuery, CommsChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CommsChannelQuery, CommsChannelQueryVariables>(CommsChannelDocument, options);
        }
export type CommsChannelQueryHookResult = ReturnType<typeof useCommsChannelQuery>;
export type CommsChannelLazyQueryHookResult = ReturnType<typeof useCommsChannelLazyQuery>;
export type CommsChannelQueryResult = ApolloReactCommon.QueryResult<CommsChannelQuery, CommsChannelQueryVariables>;