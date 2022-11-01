import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type SaveUserEmailMutationVariables = Types.Exact<{
  input: Types.UserEmailUpdateInput;
}>;


export type SaveUserEmailMutation = { __typename?: 'Mutation', userEmailUpdate: { __typename?: 'GeneralResolverResponse', success: boolean } };

export type DeleteUserEmailMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type DeleteUserEmailMutation = { __typename?: 'Mutation', userEmailDelete: { __typename?: 'GeneralResolverResponse', success: boolean } };

export type GetTelegramVerificationLinkMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTelegramVerificationLinkMutation = { __typename?: 'Mutation', telegramVerificationLink: { __typename?: 'UserTelegramVerificationLinkPayload', link: string } };


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
export const DeleteUserEmailDocument = gql`
    mutation DeleteUserEmail {
  userEmailDelete {
    success
  }
}
    `;
export type DeleteUserEmailMutationFn = ApolloReactCommon.MutationFunction<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>;

/**
 * __useDeleteUserEmailMutation__
 *
 * To run a mutation, you first call `useDeleteUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserEmailMutation, { data, loading, error }] = useDeleteUserEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>(DeleteUserEmailDocument, options);
      }
export type DeleteUserEmailMutationHookResult = ReturnType<typeof useDeleteUserEmailMutation>;
export type DeleteUserEmailMutationResult = ApolloReactCommon.MutationResult<DeleteUserEmailMutation>;
export type DeleteUserEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>;
export const GetTelegramVerificationLinkDocument = gql`
    mutation GetTelegramVerificationLink {
  telegramVerificationLink {
    link
  }
}
    `;
export type GetTelegramVerificationLinkMutationFn = ApolloReactCommon.MutationFunction<GetTelegramVerificationLinkMutation, GetTelegramVerificationLinkMutationVariables>;

/**
 * __useGetTelegramVerificationLinkMutation__
 *
 * To run a mutation, you first call `useGetTelegramVerificationLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetTelegramVerificationLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getTelegramVerificationLinkMutation, { data, loading, error }] = useGetTelegramVerificationLinkMutation({
 *   variables: {
 *   },
 * });
 */
export function useGetTelegramVerificationLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetTelegramVerificationLinkMutation, GetTelegramVerificationLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GetTelegramVerificationLinkMutation, GetTelegramVerificationLinkMutationVariables>(GetTelegramVerificationLinkDocument, options);
      }
export type GetTelegramVerificationLinkMutationHookResult = ReturnType<typeof useGetTelegramVerificationLinkMutation>;
export type GetTelegramVerificationLinkMutationResult = ApolloReactCommon.MutationResult<GetTelegramVerificationLinkMutation>;
export type GetTelegramVerificationLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<GetTelegramVerificationLinkMutation, GetTelegramVerificationLinkMutationVariables>;