import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useUserPreferencesUpdateMutation } from './operations.generated';
import { GetUserDocument, GetUserQuery } from 'context/UserContext/operations.generated';
import { Web2ChannelLower } from 'context/UserContext/const';
import { UserPreference } from 'global/types.generated';

const useUpdatePreference = () => {
  const [updateUserPreferences] = useUserPreferencesUpdateMutation();
  const { isOnboarding } = useAuthContext();

  const updatePreference = (
    categoryId: string,
    appOrEnabled: Web2ChannelLower | 'enabled',
    pref?: Partial<UserPreference>
  ) => {
    const updatedPref = { ...pref, [appOrEnabled]: !pref?.[appOrEnabled] };
    const enabled = !!updatedPref.enabled;

    const update = {
      commsChannelTagId: categoryId,
      enabled,
      discord: enabled && !!updatedPref?.discord,
      // during onboarding, enable TG by default when switching on for first time
      telegram: enabled && ((!pref && isOnboarding) || !!updatedPref?.telegram),
      email: enabled && !!updatedPref?.email,
    };

    updateUserPreferences({
      optimisticResponse: {
        userPreferencesUpdate: {
          __typename: 'UserPreference',
          id: updatedPref.id || 'temp-id',
          ...update,
        },
      },
      variables: {
        input: update,
      },
      update(cache, { data }) {
        if (updatedPref.id) {
          return;
        }

        const currentUser = cache.readQuery<GetUserQuery>({
          query: GetUserDocument,
        }) as GetUserQuery;

        if (!currentUser) return;

        // if a new preference was created (and not updated), update the cache user object to contain it.
        cache.writeQuery({
          query: GetUserDocument,
          data: {
            user: {
              ...currentUser.user,
              preferences: [
                ...(currentUser.user?.preferences || []),
                { ...data?.userPreferencesUpdate },
              ],
            },
          },
        });
      },
    });
  };

  return updatePreference;
};

export default useUpdatePreference;
