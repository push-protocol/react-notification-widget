import React from 'react';
import styled from 'styled-components';
import { useChannelContext } from 'context/ChannelContext';
import { mode } from 'theme';
import PreferencesHeader from 'components/Preferences/components/PreferencesHeader';
import PreferenceCategoryItem from 'components/Preferences/components/PreferenceCategoryItem';
import { MessagingApp } from 'global/types.generated';
import { useUserContext } from 'context/UserContext';

const PreferencesContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  background: ${({ theme }) => mode(theme.colors.dark[10], undefined)};
  padding: ${({ theme }) => theme.spacing(1)}px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => mode(theme.colors.light[10], theme.colors.dark[10])};
  box-sizing: border-box;
`;

export type MessagingAppConfig = { enabled: boolean; app: MessagingApp };

type PropsT = {
  hideChannelInfo?: boolean;
  messagingApps: MessagingAppConfig[];
};

const Preferences = ({ hideChannelInfo, messagingApps }: PropsT) => {
  const { user } = useUserContext();
  const { messageCategories } = useChannelContext();

  return (
    <PreferencesContainer>
      <PreferencesHeader hideChannelInfo={hideChannelInfo} messagingAppConfig={messagingApps} />
      {messageCategories.map((category) => (
        <PreferenceCategoryItem
          key={category.id}
          category={category}
          userPref={user?.preferences?.find(
            (userPref) => userPref.commsChannelTagId === category.id
          )}
          messagingAppConfig={messagingApps}
        />
      ))}
    </PreferencesContainer>
  );
};

export default Preferences;
