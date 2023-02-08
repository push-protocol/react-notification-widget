import * as Types from 'global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type SaveUserEmailMutationVariables = Types.Exact<{
  input: Types.UserEmailUpdateInput;
}>;


export type SaveUserEmailMutation = { __typename?: 'Mutation', userEmailUpdate: { __typename?: 'GeneralResolverResponse', success: boolean } };

export type ValidateUserEmailMutationVariables = Types.Exact<{
  input: Types.UserEmailValidateInput;
}>;


export type ValidateUserEmailMutation = { __typename?: 'Mutation', userEmailValidate: { __typename?: 'GeneralResolverResponse', success: boolean } };

export type GetTelegramVerificationLinkMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTelegramVerificationLinkMutation = { __typename?: 'Mutation', telegramVerificationLinkGenerate: { __typename?: 'UserTelegramVerificationLinkPayload', link: string } };

export type VerifyUserDiscordMutationVariables = Types.Exact<{
  input: Types.UserDiscordVerifyInput;
}>;


export type VerifyUserDiscordMutation = { __typename?: 'Mutation', userDiscordVerify: { __typename?: 'GeneralResolverResponse', success: boolean } };

export type DeleteChannelMutationVariables = Types.Exact<{
  input: Types.UserCommunicationChannelDeleteInput;
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', userCommunicationsChannelDelete: { __typename?: 'GeneralResolverResponse', success: boolean } };


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
export const GetTelegramVerificationLinkDocument = gql`
    mutation GetTelegramVerificationLink {
  telegramVerificationLinkGenerate {
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
export const VerifyUserDiscordDocument = gql`
    mutation VerifyUserDiscord($input: UserDiscordVerifyInput!) {
  userDiscordVerify(input: $input) {
    success
  }
}
    `;
export type VerifyUserDiscordMutationFn = ApolloReactCommon.MutationFunction<VerifyUserDiscordMutation, VerifyUserDiscordMutationVariables>;

/**
 * __useVerifyUserDiscordMutation__
 *
 * To run a mutation, you first call `useVerifyUserDiscordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserDiscordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserDiscordMutation, { data, loading, error }] = useVerifyUserDiscordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyUserDiscordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyUserDiscordMutation, VerifyUserDiscordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyUserDiscordMutation, VerifyUserDiscordMutationVariables>(VerifyUserDiscordDocument, options);
      }
export type VerifyUserDiscordMutationHookResult = ReturnType<typeof useVerifyUserDiscordMutation>;
export type VerifyUserDiscordMutationResult = ApolloReactCommon.MutationResult<VerifyUserDiscordMutation>;
export type VerifyUserDiscordMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyUserDiscordMutation, VerifyUserDiscordMutationVariables>;
export const DeleteChannelDocument = gql`
    mutation DeleteChannel($input: UserCommunicationChannelDeleteInput!) {
  userCommunicationsChannelDelete(input: $input) {
    success
  }
}
    `;
export type DeleteChannelMutationFn = ApolloReactCommon.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteChannelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, options);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = ApolloReactCommon.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
