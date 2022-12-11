import React, { useState } from 'react';
import styled from 'styled-components';
import { MessagingApp } from 'global/types.generated';
import PreferencesHeader from 'components/Preferences/components/PreferencesHeader';
import PreferenceCategoryItem from 'components/Preferences/components/PreferenceCategoryItem';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useChannelContext } from 'context/ChannelContext';

const PreferencesContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export type UserPrefs = Record<string, { [key in MessagingApp]: boolean }>;

export const userChannels = ['DISCORD', 'TELEGRAM', 'EMAIL'] as MessagingApp[];

const prefCategories = [
  { title: 'Marketing' },
  { title: 'Product Updates' },
  { title: 'Announcements' },
  { title: 'Liquidation Alerts' },
];

const Preferences = () => {
  const { setRoute } = useRouterContext();
  const { handlePreferenceChange, userPrefs, prefCategories, enabledPrefs, togglePref } =
    useChannelContext();
  // const [userPrefs, setUserPrefs] = useState<UserPrefs>({});
  // const [enabledPrefs, setEnabledPrefs] = useState<Record<string, boolean>>({});
  //
  // const togglePref = (pref: string) => {
  //   const newPrefSetting = !enabledPrefs[pref];
  //
  //   if (!newPrefSetting) {
  //     setUserPrefs({ ...userPrefs, [pref]: {} } as UserPrefs);
  //   }
  //
  //   setEnabledPrefs((oldPrefs) => ({ ...oldPrefs, [pref]: newPrefSetting }));
  // };
  //
  // const handlePreferenceChange = (pref: string, channel: MessagingApp) => {
  //   if (!enabledPrefs[pref]) return;
  //   const isPrefEnabled = userPrefs[pref]?.[channel];
  //
  //   const newPrefs: UserPrefs = {
  //     ...userPrefs,
  //     [pref]: {
  //       ...userPrefs[pref],
  //       [channel]: !isPrefEnabled,
  //     },
  //   };
  //
  //   setUserPrefs(newPrefs);
  // };

  return (
    <PreferencesContainer>
      <PreferencesHeader />
      {prefCategories.map(({ title }) => (
        <PreferenceCategoryItem
          key={title}
          title={title}
          togglePref={togglePref}
          userPrefs={userPrefs}
          enabledPrefs={enabledPrefs}
          handlePreferenceChange={handlePreferenceChange}
        />
      ))}
    </PreferencesContainer>
  );
};

export default Preferences;
