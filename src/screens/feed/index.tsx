import React, { useState } from 'react';
import styled from 'styled-components';
import { NotificationClickProp } from '../../components/types';
import { useNotificationsContext } from '../../context/NotificationsContext';
import Spinner from '../../components/Spinner';
import { useChannelContext } from '../../context/ChannelContext';
import NotificationFeedItem from './components/NotificationFeedItem';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Text from 'components/Text';
import { Settings } from 'components/icons';
import Flex from 'components/layout/Flex';
import FeedNavigation, { NavigationTabs } from 'screens/feed/components/FeedNavigation';
import { Routes, useRouterContext } from 'context/RouterContext';

const NotificationFeed = styled(Flex)`
  &:not(:last-child) {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border.main}}`};
  }
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100% + 18px);
  padding: 0 10px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SettingsIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  color: ${({ theme }) => theme.colors.gray[100]};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const Feed = ({ onNotificationClick }: NotificationClickProp) => {
  const { notifications: allNotifications, isLoading } = useNotificationsContext();
  const { channelAddress } = useChannelContext();
  const { setRoute } = useRouterContext();
  const [activeTab, setActiveTab] = useState(NavigationTabs.App);

  const handleViewSettings = () => {
    setRoute(Routes.Settings);
  };

  const notificationsToShow =
    activeTab === NavigationTabs.App
      ? allNotifications.filter(
          (notif) => notif.appAddress.toLowerCase() === channelAddress.toLowerCase()
        )
      : allNotifications;

  return (
    <CenteredContainer>
      <Flex justifyContent={'space-between'} width={'100%'} mb={2}>
        <Text size={'xl'} weight={700}>
          Notifications
        </Text>
        <SettingsIcon onClick={handleViewSettings}>
          <Settings />
        </SettingsIcon>
      </Flex>
      <FeedNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <NotificationFeed width={'100%'} direction={'column'} mb={2} gap={2}>
        {isLoading ? (
          <Flex height={150} justifyContent={'center'} alignItems={'center'} pb={3}>
            <Spinner />
          </Flex>
        ) : (
          notificationsToShow.map((notification, index) => {
            return (
              <NotificationFeedItem
                onNotificationClick={onNotificationClick}
                key={index}
                notification={notification}
                showSenderDetails={activeTab === NavigationTabs.All}
              />
            );
          })
        )}
      </NotificationFeed>
    </CenteredContainer>
  );
};
