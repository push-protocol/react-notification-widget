import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Gear, ArrowLeft } from '@emotion-icons/octicons';
import Flex from '../layout/Flex';
import Text from '../Text';
import NotificationFeedItem from '../NotificationFeedItem';
import IconButton from '../IconButton';
import Spinner from '../Spinner';
import NotificationSettings from '../NotificationSettings';
import { useNotificationsContext } from 'context/NotificationsContext';

const FeedContainer = styled.div`
  width: 400px;
  height: 460px;
  overflow-y: auto;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid lightgray;
  box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.colors.bg.main};
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NotificationsFeeItemContainer = styled(Flex)`
  height: 380px;
  gap: 8px;
  flex-direction: column;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NotificationFeed = () => {
  const { notifications, isLoading } = useNotificationsContext();
  const [isViewingSettings, setIsViewingSettings] = useState(false);

  const theme = useTheme();

  return (
    <FeedContainer>
      <Flex height={45} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
        <Text size={'xl'} style={{ padding: 10 }}>
          <strong>Notifications</strong>
        </Text>
        <IconButton
          onClick={() => setIsViewingSettings(!isViewingSettings)}
          style={{ marginRight: 15 }}
        >
          {isViewingSettings ? (
            <ArrowLeft fill={theme.colors.text.primary} size={20} />
          ) : (
            <Gear fill={theme.colors.text.primary} size={20} />
          )}
        </IconButton>
      </Flex>
      <div style={{ width: '100%', borderBottom: '1px solid gray' }} />
      {isViewingSettings ? (
        <NotificationSettings />
      ) : isLoading ? (
        <div style={{ margin: '100px auto', width: 50, height: '100%' }}>
          <Spinner />
        </div>
      ) : (
        <NotificationsFeeItemContainer>
          {notifications.map((notification, i) => (
            <NotificationFeedItem key={i} notification={notification} />
          ))}
        </NotificationsFeeItemContainer>
      )}
      <Flex p={1} justifyContent={'center'} width={'100%'}>
        <Text>Powered by 🔥Warm</Text>
      </Flex>
    </FeedContainer>
  );
};

export default NotificationFeed;
