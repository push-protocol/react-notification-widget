import React from 'react';
import styled from 'styled-components';
import { mode } from '../../theme';
import PreferencesHeader from '../Preferences/components/PreferencesHeader';
import PreferenceCategoryItem from '../Preferences/components/PreferenceCategoryItem';
import Flex from '../layout/Flex';
import { useEnvironment } from '../../context/EnvironmentContext';
import { MessagingApp } from 'global/types.generated';
import { useUserContext } from 'context/UserContext';
import { useChannelContext } from 'context/ChannelContext';

const PreferencesContainer = styled.div<{ hideBorder: boolean }>`
  width: 100%;
  background: ${({ theme }) => mode(theme.w.colors.dark[10], undefined)};
  border-radius: ${({ theme }) => theme.w.borderRadius.md};
  padding: ${({ hideBorder }) => (hideBorder ? 0 : '16px 8px 8px 0')};
  box-sizing: border-box;
  border: 1px solid
    ${({ theme, hideBorder }) =>
      hideBorder ? 'transparent' : mode(theme.w.colors.light[10], theme.w.colors.dark[10])};
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
  const { isSubscribeOnlyMode } = useEnvironment();
  const { messageCategories } = useChannelContext();

  return (
    <PreferencesContainer hideBorder={isSubscribeOnlyMode}>
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
