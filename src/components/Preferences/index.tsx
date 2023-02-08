import React from 'react';
import styled from 'styled-components';
import { mode } from '../../theme';
import PreferencesHeader from '../Preferences/components/PreferencesHeader';
import PreferenceCategoryItem from '../Preferences/components/PreferenceCategoryItem';
import Flex from '../layout/Flex';
import { MessagingApp } from 'global/types.generated';
import { useUserContext } from 'context/UserContext';
import { useChannelContext } from 'context/ChannelContext';

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
  onDisabledAppClick?: (app: MessagingApp) => void;
};

const Preferences = (props: PropsT) => {
  const { user } = useUserContext();
  const { messageCategories } = useChannelContext();

  return (
    <PreferencesContainer>
      <PreferencesHeader {...props} />
      <Flex direction={'column'} gap={props.hideDescriptions ? 1 : 2}>
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
