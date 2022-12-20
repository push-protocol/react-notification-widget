import React, { useEffect, useState } from 'react';
import { MessagingApp } from 'global/types.generated';
import {
  useUserPreferenceCategoriesLazyQuery,
  useUserPreferencesUpdateMutation,
} from 'context/ChannelContext/operations.generated';
import { useAuthContext } from 'context/AuthContext';

export type PreferenceCategory = {
  id: string;
  title: string;
};

export type UserPreference = Record<string, Record<string, any>>;

const useChannelPreferences = () => {
  const [preferenceCategories, setPreferenceCategories] = useState<PreferenceCategory[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreference>({});
  const { isLoggedIn } = useAuthContext();

  const [
    fetchUserPreferences,
    { data, loading: userPreferencesLoading, refetch: refetchUserPreferences },
  ] = useUserPreferenceCategoriesLazyQuery();

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserPreferences();
    }
  }, [isLoggedIn]);

  const [updateUserPreferences] = useUserPreferencesUpdateMutation();

  // Fetch saved user tags and preferences
  useEffect(() => {
    if (data?.commsChannelTags && data.commsChannelTags.length > 0) {
      setPreferenceCategories(
        data?.commsChannelTags?.map((tag) => {
          return {
            id: tag.id,
            title: tag.name,
          };
        })
      );

      const preferences = data?.commsChannelTags?.map((tag) => {
        return {
          [tag.id]: {
            ...tag?.userPreferences[0],
            commsChannelTagId: tag.id,
          },
        };
      });
      setUserPreferences(Object.assign({}, ...preferences));
    }
  }, [data]);

  const savePreferences = (updatedPreferences: UserPreference) => {
    updateUserPreferences({
      variables: {
        input: Object.values(updatedPreferences).map((item) => {
          return {
            commsChannelTagId: item.commsChannelTagId,
            enabled: !!item?.enabled,
            discord: !!item?.discord,
            telegram: !!item?.telegram,
            email: !!item?.email,
          };
        }),
      },
    });
  };

  const handleUpdateUserPreferences = (id: string, appOrEnabled: string) => {
    const updatedPreferences = { ...userPreferences };
    updatedPreferences[id][appOrEnabled.toLowerCase()] =
      !updatedPreferences[id][appOrEnabled.toLowerCase()];
    setUserPreferences(updatedPreferences);
    savePreferences(updatedPreferences);
  };

  return {
    preferenceCategories,
    userPreferences,
    userPreferencesCount: Object.keys(userPreferences).length,
    userPreferencesLoading,
    handleUpdateUserPreferences,
    refetchUserPreferences,
    fetchUserPreferences,
  };
};

export const isPreferenceChannelSelected = (
  userPreferences: UserPreference,
  channel: MessagingApp
) => {
  return Object.values(userPreferences).some(
    (pref) => pref[channel.toLowerCase()] && pref['enabled']
  );
};

export default useChannelPreferences;
