import React from 'react';
import styled from 'styled-components';
import PreferencesHeader from 'components/Preferences/components/PreferencesHeader';
import PreferenceCategoryItem from 'components/Preferences/components/PreferenceCategoryItem';
import { MessagingApp } from 'global/types.generated';
import { useUserContext } from 'context/UserContext';

const PreferencesContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.dark['10']};
  padding: ${({ theme }) => theme.spacing(1)}px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.light['10']};
  box-sizing: border-box;
`;

type PreferencesProps = {
  hideChannelInfo?: boolean;
  userChannels: MessagingApp[];
};

const Preferences = ({ hideChannelInfo, userChannels }: PreferencesProps) => {
  const { preferenceCategories, userPreferences, handleUpdateUserPreferences } = useUserContext();

  return (
    <PreferencesContainer>
      <PreferencesHeader hideChannelInfo={hideChannelInfo} userChannels={userChannels} />
      {preferenceCategories.map(({ id, title }) => (
        <PreferenceCategoryItem
          key={id}
          category={id}
          title={title}
          userPreferences={userPreferences}
          handleUpdateUserPreferences={handleUpdateUserPreferences}
          userChannels={userChannels}
        />
      ))}
    </PreferencesContainer>
  );
};

export default Preferences;
