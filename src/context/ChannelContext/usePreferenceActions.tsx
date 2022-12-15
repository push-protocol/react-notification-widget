import React, { ReactNode, useEffect, useState } from 'react';
import { MessagingApp } from 'global/types.generated';
import { Discord, Email, Telegram } from 'components/icons';
import {
  useUserPreferenceCategoriesQuery,
  useUserPreferencesUpdateMutation,
} from 'context/ChannelContext/operations.generated';

export type UserPrefs = Record<string, { [key in MessagingApp]?: boolean }>;

export const defaultUserChannels = [
  MessagingApp.Discord,
  MessagingApp.Telegram,
  MessagingApp.Email,
] as MessagingApp[];

export const userChannelMapper: { [key: string]: { title: string; icon: ReactNode } } = {
  [MessagingApp.Discord]: {
    title: 'Discord',
    icon: <Discord />,
  },
  [MessagingApp.Telegram]: {
    title: 'Telegram',
    icon: <Telegram />,
  },
  [MessagingApp.Email]: {
    title: 'Email',
    icon: <Email />,
  },
};

export type PreferenceCategory = {
  id: string;
  title: string;
};

export type UserPreference = Record<string, Record<string, any>>;

const usePreferenceActions = () => {
  const [preferenceCategories, setPreferenceCategories] = useState<PreferenceCategory[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreference>({});
  const [userChannels, setUserChannels] = useState<MessagingApp[]>(defaultUserChannels);

  const { data } = useUserPreferenceCategoriesQuery();

  const [updateUserPreferences] = useUserPreferencesUpdateMutation();

  // TODO: discuss - possibly filter out discord option if guild url is not set
  // const userChannels = defaultUserChannels.filter((channel) =>
  //   !discordGuildUrl ? channel !== MessagingApp.Discord : true
  // );

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
            discord: !!item?.enabled,
            telegram: !!item?.enabled,
            email: !!item?.enabled,
          };
        }),
      },
    });
  };

  const handleUpdateUserPreferences = (id: string, key: string) => {
    const updatedPreferences = { ...userPreferences };
    key = key?.toLowerCase(); // BE uses lower case channel names for channels
    updatedPreferences[id][key] = !updatedPreferences[id][key];
    setUserPreferences(updatedPreferences);
    savePreferences(updatedPreferences);
  };

  return {
    preferenceCategories,
    userPreferences,
    handleUpdateUserPreferences,
    userChannels,
    setUserChannels,
  };
};

export const isPreferenceChannelSelected = (userPreferences: UserPreference, parameter: string) => {
  return Object.values(userPreferences).some(
    (value) => value[parameter.toLowerCase()] && value['enabled']
  );
};

export default usePreferenceActions;
