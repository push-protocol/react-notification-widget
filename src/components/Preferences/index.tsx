import React, { useEffect } from 'react';
import styled from 'styled-components';
import PreferencesHeader from 'components/Preferences/components/PreferencesHeader';
import PreferenceCategoryItem from 'components/Preferences/components/PreferenceCategoryItem';
import { useChannelContext } from 'context/ChannelContext';
import { useAuthContext } from 'context/AuthContext';

const PreferencesContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.dark['10']};
  padding: ${({ theme }) => theme.spacing(1)}px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.light['10']};
`;

const Preferences = () => {
  const { login } = useAuthContext();

  useEffect(() => {
    login();
  }, []);

  const { preferenceCategories, userPreferences, handleUpdateUserPreferences, userChannels } =
    useChannelContext();

  return (
    <PreferencesContainer>
      <PreferencesHeader />
      {preferenceCategories.map(({ id, title }) => (
        <PreferenceCategoryItem
          key={id}
          id={id}
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
