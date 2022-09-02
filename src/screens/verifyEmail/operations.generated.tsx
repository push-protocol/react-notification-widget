import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type ValidateUserEmailMutationVariables = Types.Exact<{
  input: Types.UserEmailValidateInput;
}>;


export type ValidateUserEmailMutation = { __typename?: 'Mutation', userEmailValidate: Array<{ __typename?: 'GeneralResolverResponse', success: boolean }> };


export const ValidateUserEmailDocument = gql`
    mutation ValidateUserEmail($input: UserEmailValidateInput!) {
  userEmailValidate(input: $input) {
    success
  }
}
    `;
export type ValidateUserEmailMutationFn = ApolloReactCommon.MutationFunction<ValidateUserEmailMutation, ValidateUserEmailMutationVariables>;

/**
 * __useValidateUserEmailMutation__
 *
 * To run a mutation, you first call `useValidateUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateUserEmailMutation, { data, loading, error }] = useValidateUserEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useValidateUserEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ValidateUserEmailMutation, ValidateUserEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ValidateUserEmailMutation, ValidateUserEmailMutationVariables>(ValidateUserEmailDocument, options);
      }
export type ValidateUserEmailMutationHookResult = ReturnType<typeof useValidateUserEmailMutation>;
export type ValidateUserEmailMutationResult = ApolloReactCommon.MutationResult<ValidateUserEmailMutation>;
export type ValidateUserEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<ValidateUserEmailMutation, ValidateUserEmailMutationVariables>;