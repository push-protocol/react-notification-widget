import React from 'react';
import styled from 'styled-components';
import { NavigationTabs } from 'screens/feed/components/FeedNavigation';
import { useNotificationsContext } from 'context/NotificationsContext';
import Flex from 'components/layout/Flex';
import NotificationFeedItem from 'screens/feed/components/NotificationFeedItem';

type NotificationFeedProps = {
  active: NavigationTabs;
};

const Container = styled(Flex)`
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NotificationFeed = ({ active }: NotificationFeedProps) => {
  const { notifications, isLoading } = useNotificationsContext();

  console.log(notifications, '??');

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <Container width={'100%'} direction={'column'} mb={2} gap={2}>
      {notifications.map((notification, index) => {
        return <NotificationFeedItem key={index} notification={notification} />;
      })}
    </Container>
  );
};

export default NotificationFeed;
