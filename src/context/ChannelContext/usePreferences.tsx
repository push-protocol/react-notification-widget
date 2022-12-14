import React, { ReactNode, useEffect, useState } from 'react';
import { MessagingApp } from 'global/types.generated';
import { Discord, Email, Telegram } from 'components/icons';
import { useUserPreferenceCategoriesQuery } from 'context/ChannelContext/operations.generated';
import { Routes, useRouterContext } from 'context/RouterContext';

export type UserPrefs = Record<string, { [key in MessagingApp]?: boolean }>;

const defaultUserChannels = [
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

type PreferenceCategory = {
  title: string;
};

const usePreferences = ({
  discordToken,
  discordGuildUrl,
}: {
  discordToken?: string;
  discordGuildUrl?: string | null;
}) => {
  const { setRoute } = useRouterContext();
  const [userPrefs, setUserPrefs] = useState<UserPrefs>({});
  const [enabledPrefs, setEnabledPrefs] = useState<Record<string, boolean>>({});
  const [preferenceCategories, setPreferenceCategories] = useState<PreferenceCategory[]>([]);

  const { data, loading } = useUserPreferenceCategoriesQuery({});
  console.log(loading, 'loadingloading');
  // Filter out discord option if guild url is not set
  const userChannels = defaultUserChannels.filter((channel) =>
    !discordGuildUrl ? channel !== MessagingApp.Discord : true
  );

  useEffect(() => {
    console.log(data, '?.commsChannelTags.length');

    if (!loading && data?.commsChannelTags && data.commsChannelTags.length < 2) {
      console.log('such empty');
    }
  }, [loading, data]);

  useEffect(() => {
    if (data?.commsChannelTags && data.commsChannelTags.length > 1) {
      setPreferenceCategories(
        data?.commsChannelTags?.map((tag) => {
          return {
            title: tag.name,
          };
        })
      );
    }
  }, [data]);

  console.log(preferenceCategories, 'preferenceCategories');
  // Preselect discord when token is passed
  useEffect(() => {
    if (discordToken) {
      const newEnabledPrefs: Record<string, boolean> = {};
      const newUserPrefs: UserPrefs = {};

      for (const category of preferenceCategories) {
        newEnabledPrefs[category.title] = true;
        newUserPrefs[category.title] = {
          [MessagingApp.Discord]: true,
        };
      }

      setEnabledPrefs(newEnabledPrefs);
      setUserPrefs(newUserPrefs);
    }
  }, [discordToken]);

  const togglePref = (pref: string) => {
    const newPrefSetting = !enabledPrefs[pref];

    if (!newPrefSetting) {
      setUserPrefs({ ...userPrefs, [pref]: {} } as UserPrefs);
    }

    setEnabledPrefs((oldPrefs) => ({ ...oldPrefs, [pref]: newPrefSetting }));
  };

  const handlePreferenceChange = (pref: string, channel: MessagingApp) => {
    if (!enabledPrefs[pref]) return;
    const isPrefEnabled = userPrefs[pref]?.[channel];

    const newPrefs: UserPrefs = {
      ...userPrefs,
      [pref]: {
        ...userPrefs[pref],
        [channel]: !isPrefEnabled,
      },
    };

    setUserPrefs(newPrefs);
  };

  return {
    userPrefs,
    enabledPrefs,
    handlePreferenceChange,
    preferenceCategories,
    togglePref,
    userChannels,
  };
};

export default usePreferences;
