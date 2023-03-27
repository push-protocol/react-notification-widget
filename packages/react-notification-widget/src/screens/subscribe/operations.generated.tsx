import * as Types from '../../global/types.generated';

import { gql } from '@apollo/client';
import { UserInfoFragmentDoc } from '../../context/UserContext/operations.generated';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type UserSubscribeMutationVariables = Types.Exact<{
  input: Types.UserSubscribeToChannelInput;
}>;


export type UserSubscribeMutation = { __typename?: 'Mutation', userSubscribeToChannel: { __typename?: 'User', id: string, lastReadAt: any, preferences: Array<{ __typename?: 'UserPreference', id: string, commsChannelTagId: string, email: boolean, telegram: boolean, discord: boolean, enabled: boolean }> } };


export const UserSubscribeDocument = gql`
    mutation UserSubscribe($input: UserSubscribeToChannelInput!) {
  userSubscribeToChannel(input: $input) {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;
export type UserSubscribeMutationFn = ApolloReactCommon.MutationFunction<UserSubscribeMutation, UserSubscribeMutationVariables>;

/**
 * __useUserSubscribeMutation__
 *
 * To run a mutation, you first call `useUserSubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSubscribeMutation, { data, loading, error }] = useUserSubscribeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserSubscribeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserSubscribeMutation, UserSubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UserSubscribeMutation, UserSubscribeMutationVariables>(UserSubscribeDocument, options);
      }
export type UserSubscribeMutationHookResult = ReturnType<typeof useUserSubscribeMutation>;
export type UserSubscribeMutationResult = ApolloReactCommon.MutationResult<UserSubscribeMutation>;
export type UserSubscribeMutationOptions = ApolloReactCommon.BaseMutationOptions<UserSubscribeMutation, UserSubscribeMutationVariables>;