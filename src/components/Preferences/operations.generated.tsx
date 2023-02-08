import * as Types from 'global/types.generated';

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
const defaultOptions = {} as const;
export type UserPreferencesUpdateMutationVariables = Types.Exact<{
  input: Types.UserPreferenceUpdateInput;
}>;


export type UserPreferencesUpdateMutation = { __typename?: 'Mutation', userPreferencesUpdate?: { __typename?: 'UserPreference', id: string, commsChannelTagId: string, email: boolean, telegram: boolean, discord: boolean, enabled: boolean } | null };


export const UserPreferencesUpdateDocument = gql`
    mutation UserPreferencesUpdate($input: UserPreferenceUpdateInput!) {
  userPreferencesUpdate(input: $input) {
    id
    commsChannelTagId
    email
    telegram
    discord
    enabled
  }
}
    `;
export type UserPreferencesUpdateMutationFn = ApolloReactCommon.MutationFunction<UserPreferencesUpdateMutation, UserPreferencesUpdateMutationVariables>;

/**
 * __useUserPreferencesUpdateMutation__
 *
 * To run a mutation, you first call `useUserPreferencesUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPreferencesUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPreferencesUpdateMutation, { data, loading, error }] = useUserPreferencesUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserPreferencesUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserPreferencesUpdateMutation, UserPreferencesUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UserPreferencesUpdateMutation, UserPreferencesUpdateMutationVariables>(UserPreferencesUpdateDocument, options);
      }
export type UserPreferencesUpdateMutationHookResult = ReturnType<typeof useUserPreferencesUpdateMutation>;
export type UserPreferencesUpdateMutationResult = ApolloReactCommon.MutationResult<UserPreferencesUpdateMutation>;
export type UserPreferencesUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<UserPreferencesUpdateMutation, UserPreferencesUpdateMutationVariables>;
