import React from 'react';
import styled from 'styled-components';
import { useChannelContext } from 'context/ChannelContext';
import { mode } from 'theme';
import PreferencesHeader from 'components/Preferences/components/PreferencesHeader';
import PreferenceCategoryItem from 'components/Preferences/components/PreferenceCategoryItem';
import { MessagingApp } from 'global/types.generated';
import { useUserContext } from 'context/UserContext';
import Flex from 'components/layout/Flex';

const PreferencesContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  background: ${({ theme }) => mode(theme.w.colors.dark[10], undefined)};
  padding: ${({ theme }) => theme.w.spacing(1)}px;
  border-radius: ${({ theme }) => theme.w.borderRadius.md};
  border: 1px solid ${({ theme }) => mode(theme.w.colors.light[10], theme.w.colors.dark[10])};
  box-sizing: border-box;
`;

export type MessagingAppConfig = { enabled: boolean; app: MessagingApp };

type PropsT = {
  hideChannelInfo?: boolean;
  hideDescriptions?: boolean;
  hideToggles?: boolean;
  appConfig: MessagingAppConfig[];
  setAppOpen?: (open?: MessagingApp) => void;
};

const Preferences = (props: PropsT) => {
  const { user } = useUserContext();
  const { messageCategories } = useChannelContext();

  return (
    <PreferencesContainer>
      <PreferencesHeader {...props} />
      <Flex direction={'column'} gap={1}>
        {messageCategories.map((category) => (
          <PreferenceCategoryItem
            {...props}
            key={category.id}
            category={category}
            userPref={user?.preferences?.find(
              (userPref) => userPref.commsChannelTagId === category.id
            )}
          />
        ))}
      </Flex>
    </PreferencesContainer>
  );
};

export default Preferences;
