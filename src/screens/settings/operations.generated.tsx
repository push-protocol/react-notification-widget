import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type UnsubscribeMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UnsubscribeMutation = { __typename?: 'Mutation', userUnsubscribeFromChannel: { __typename?: 'User', id: string } };


export const UnsubscribeDocument = gql`
    mutation Unsubscribe {
  userUnsubscribeFromChannel {
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