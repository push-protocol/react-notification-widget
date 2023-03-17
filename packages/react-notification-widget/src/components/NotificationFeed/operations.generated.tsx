import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateLastReadMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UpdateLastReadMutation = { __typename?: 'Mutation', userUpdateLastReadAt: { __typename?: 'User', id: string, lastReadAt: any } };


export const UpdateLastReadDocument = gql`
    mutation UpdateLastRead {
  userUpdateLastReadAt {
    id
    lastReadAt
  }
}
    `;
export type UpdateLastReadMutationFn = ApolloReactCommon.MutationFunction<UpdateLastReadMutation, UpdateLastReadMutationVariables>;

/**
 * __useUpdateLastReadMutation__
 *
 * To run a mutation, you first call `useUpdateLastReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLastReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLastReadMutation, { data, loading, error }] = useUpdateLastReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateLastReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLastReadMutation, UpdateLastReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateLastReadMutation, UpdateLastReadMutationVariables>(UpdateLastReadDocument, options);
      }
export type UpdateLastReadMutationHookResult = ReturnType<typeof useUpdateLastReadMutation>;
export type UpdateLastReadMutationResult = ApolloReactCommon.MutationResult<UpdateLastReadMutation>;
export type UpdateLastReadMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLastReadMutation, UpdateLastReadMutationVariables>;