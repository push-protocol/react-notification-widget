import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type SaveUserEmailMutationVariables = Types.Exact<{
  input: Types.UserEmailUpdateInput;
}>;


export type SaveUserEmailMutation = { __typename?: 'Mutation', userEmailUpdate: Array<{ __typename?: 'GeneralResolverResponse', success: boolean }> };


export const SaveUserEmailDocument = gql`
    mutation SaveUserEmail($input: UserEmailUpdateInput!) {
  userEmailUpdate(input: $input) {
    success
  }
}
    `;
export type SaveUserEmailMutationFn = ApolloReactCommon.MutationFunction<SaveUserEmailMutation, SaveUserEmailMutationVariables>;

/**
 * __useSaveUserEmailMutation__
 *
 * To run a mutation, you first call `useSaveUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserEmailMutation, { data, loading, error }] = useSaveUserEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveUserEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveUserEmailMutation, SaveUserEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SaveUserEmailMutation, SaveUserEmailMutationVariables>(SaveUserEmailDocument, options);
      }
export type SaveUserEmailMutationHookResult = ReturnType<typeof useSaveUserEmailMutation>;
export type SaveUserEmailMutationResult = ApolloReactCommon.MutationResult<SaveUserEmailMutation>;
export type SaveUserEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveUserEmailMutation, SaveUserEmailMutationVariables>;