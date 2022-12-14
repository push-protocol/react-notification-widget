import React from 'react';
import styled from 'styled-components';
import PreferencesHeader from 'components/Preferences/components/PreferencesHeader';
import PreferenceCategoryItem from 'components/Preferences/components/PreferenceCategoryItem';
import { useChannelContext } from 'context/ChannelContext';

const PreferencesContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.dark['10']};
  padding: ${({ theme }) => theme.spacing(1)}px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.light['10']};
`;

const Preferences = () => {
  const {
    handlePreferenceChange,
    userPrefs,
    preferenceCategories,
    enabledPrefs,
    togglePref,
    userChannels,
  } = useChannelContext();
  return (
    <PreferencesContainer>
      <PreferencesHeader />
      {preferenceCategories.map(({ title }) => (
        <PreferenceCategoryItem
          key={title}
          title={title}
          togglePref={togglePref}
          userPrefs={userPrefs}
          enabledPrefs={enabledPrefs}
          userChannels={userChannels}
          handlePreferenceChange={handlePreferenceChange}
        />
      ))}
    </PreferencesContainer>
  );
};

export default Preferences;
