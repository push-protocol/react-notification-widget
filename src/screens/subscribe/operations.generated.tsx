import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type UserSubscribedMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UserSubscribedMutation = { __typename?: 'Mutation', userSubscribeToChannel: { __typename?: 'GeneralResolverResponse', success: boolean } };


export const UserSubscribedDocument = gql`
    mutation UserSubscribed {
  userSubscribeToChannel {
    success
  }
}
    `;
export type UserSubscribedMutationFn = ApolloReactCommon.MutationFunction<UserSubscribedMutation, UserSubscribedMutationVariables>;

/**
 * __useUserSubscribedMutation__
 *
 * To run a mutation, you first call `useUserSubscribedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSubscribedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSubscribedMutation, { data, loading, error }] = useUserSubscribedMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserSubscribedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserSubscribedMutation, UserSubscribedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UserSubscribedMutation, UserSubscribedMutationVariables>(UserSubscribedDocument, options);
      }
export type UserSubscribedMutationHookResult = ReturnType<typeof useUserSubscribedMutation>;
export type UserSubscribedMutationResult = ApolloReactCommon.MutationResult<UserSubscribedMutation>;
export type UserSubscribedMutationOptions = ApolloReactCommon.BaseMutationOptions<UserSubscribedMutation, UserSubscribedMutationVariables>;