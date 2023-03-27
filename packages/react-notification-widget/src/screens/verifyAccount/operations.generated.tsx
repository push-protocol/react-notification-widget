import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type NonceGenerateMutationVariables = Types.Exact<{
  input: Types.NonceGenerateInput;
}>;


export type NonceGenerateMutation = { __typename?: 'Mutation', nonceGenerate: { __typename?: 'Nonce', nonce: string } };

export type UserLoginMutationVariables = Types.Exact<{
  input: Types.UserLoginInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'UserLoginPayload', token: string, refreshToken: string } };


export const NonceGenerateDocument = gql`
    mutation NonceGenerate($input: NonceGenerateInput!) {
  nonceGenerate(input: $input) {
    nonce
  }
}
    `;
export type NonceGenerateMutationFn = ApolloReactCommon.MutationFunction<NonceGenerateMutation, NonceGenerateMutationVariables>;

/**
 * __useNonceGenerateMutation__
 *
 * To run a mutation, you first call `useNonceGenerateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNonceGenerateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [nonceGenerateMutation, { data, loading, error }] = useNonceGenerateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNonceGenerateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NonceGenerateMutation, NonceGenerateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<NonceGenerateMutation, NonceGenerateMutationVariables>(NonceGenerateDocument, options);
      }
export type NonceGenerateMutationHookResult = ReturnType<typeof useNonceGenerateMutation>;
export type NonceGenerateMutationResult = ApolloReactCommon.MutationResult<NonceGenerateMutation>;
export type NonceGenerateMutationOptions = ApolloReactCommon.BaseMutationOptions<NonceGenerateMutation, NonceGenerateMutationVariables>;
export const UserLoginDocument = gql`
    mutation UserLogin($input: UserLoginInput!) {
  userLogin(input: $input) {
    token
    refreshToken
  }
}
    `;
export type UserLoginMutationFn = ApolloReactCommon.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = ApolloReactCommon.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;