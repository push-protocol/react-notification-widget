import React from 'react';
import styled from 'styled-components';
import { NavigationTabs } from 'screens/feed/components/FeedNavigation';
import { useNotificationsContext } from 'context/NotificationsContext';
import Flex from 'components/layout/Flex';
import NotificationFeedItem from 'screens/feed/components/NotificationFeedItem';
import Spinner from 'components/Spinner';

const Container = styled(Flex)`
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

type NotificationFeedProps = {
  active: NavigationTabs;
};

const NotificationFeed = ({ active }: NotificationFeedProps) => {
  const { notifications, isLoading } = useNotificationsContext();

  if (isLoading) {
    return (
      <Flex height={150} justifyContent={'center'} alignItems={'center'} pb={3}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Container width={'100%'} direction={'column'} mb={2} gap={2}>
      {notifications.map((notification, index) => {
        return (
          <NotificationFeedItem
            key={index}
            notification={notification}
            showSenderDetails={active === NavigationTabs.All}
          />
        );
      })}
    </Container>
  );
};

export default NotificationFeed;
