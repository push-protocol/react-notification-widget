import React, { useEffect, useState } from 'react';
import { Web2Channels, Web2ChannelLower } from './const';
import { MessagingApp } from 'global/types.generated';
import {
  useUserPreferencesUpdateMutation,
  useUserPreferenceCategoriesQuery,
  UserPreferenceCategoriesQuery,
} from 'context/ChannelContext/operations.generated';
import { useAuthContext } from 'context/AuthContext';

export type PreferenceCategory = {
  id: string;
  name: string;
};

export type CommsChannelTag = UserPreferenceCategoriesQuery['commsChannelTags'][0];

export type UserPreferences = Record<string, CommsChannelTag['userPreference']>;

const useChannelPreferences = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const { isLoggedIn } = useAuthContext();

  const {
    data,
    loading: userPreferencesLoading,
    refetch: refetchUserPreferences,
  } = useUserPreferenceCategoriesQuery({ skip: !isLoggedIn });

  const [updateUserPreferences] = useUserPreferencesUpdateMutation();

  const savePreference = (pref: Partial<CommsChannelTag['userPreference']>, prefId: string) => {
    const enabled = !!pref?.enabled;

    const update = {
      commsChannelTagId: prefId,
      enabled,
      discord: enabled && !!pref?.discord,
      telegram: enabled && !!pref?.telegram,
      email: enabled && !!pref?.email,
    };

    updateUserPreferences({
      optimisticResponse: {
        userPreferencesUpdate: {
          __typename: 'UserPreference',
          id: pref.id || 'temp-id',
          ...update,
        },
      },
      update(cache, mutationResult) {
        cache.modify({
          fields: {
            commsChannelTags: (previous: CommsChannelTag[]) => {
              const updatedPref = mutationResult.data?.userPreferencesUpdate;
              const channelTag = previous.find((tag) => tag.id === updatedPref?.commsChannelTagId);

              if (channelTag && mutationResult.data) {
                channelTag.userPreference = mutationResult.data.userPreferencesUpdate;
              }

              return [
                ...previous.filter((tag) => tag.id !== updatedPref?.commsChannelTagId),
                channelTag,
              ];
            },
          },
        });
      },
      variables: {
        input: update,
      },
    });
  };

  const handleUpdateUserPreferences = (
    prefId: string,
    appOrEnabled: Web2ChannelLower | 'enabled'
  ) => {
    const pref = data?.commsChannelTags.find((tag) => tag.id === prefId)?.userPreference;
    const updatedPref = { ...pref, [appOrEnabled]: !pref?.[appOrEnabled] };
    savePreference(updatedPref, prefId);
  };

  return {
    preferences: data?.commsChannelTags || [],
    userPreferencesCount: data?.commsChannelTags.map((tag) => tag.userPreference).length,
    userPreferencesLoading,
    handleUpdateUserPreferences,
    fetchUserPreferences: refetchUserPreferences,
  };
};

export const isPreferenceChannelSelected = (
  userPreferences: CommsChannelTag[],
  channel: MessagingApp
) => {
  return userPreferences.some(
    (pref) =>
      pref.userPreference?.[channel.toLowerCase() as Web2ChannelLower] &&
      pref.userPreference?.enabled
  );
};

export default useChannelPreferences;
