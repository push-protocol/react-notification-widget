import React from 'react';
import { useTheme } from '@emotion/react';
import styled from 'styled-components';
import { Clock } from '@emotion-icons/octicons';
import Flex from '../layout/Flex';
import Text from '../Text';
import Tooltip from '../Tooltip';
import { adjustColor } from '../utils';
import { EpnsNotification } from 'context/NotificationsContext';

type PropsT = {
  notification: EpnsNotification;
};

const NotificationContainer = styled(Flex)(({ theme }) => ({
  cursor: 'pointer',
  borderBottom: `1px solid ${adjustColor(theme.colors.bg.main, theme.mode === 'dark' ? 20 : -20)}`,
}));

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const parseDate = (date: string) => {
  const dateObj = new Date(date);
  const dateOfMonth = dateObj.getDate();
  const day = dateObj.getDay();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  return `${days[day]} ${dateOfMonth}/${month}/${year}, ${hour}:${minutes}`;
};

const NotificationFeedItem: React.FC<PropsT> = ({ notification }) => {
  const theme = useTheme();

  return (
    <NotificationContainer ml={1} onClick={() => window.open(notification.cta, '_self')}>
      <Flex mt={1} mr={0.5}>
        <Tooltip position={'top-right'} label={notification.app}>
          <img
            alt={'channel icon'}
            style={{ borderRadius: '50%' }}
            height={34}
            src={notification.icon}
          />
        </Tooltip>
      </Flex>
      <Flex direction={'column'} p={1} gap={1}>
        <Text style={{ fontSize: 13 }}>{notification.title}</Text>
        <Text style={{ fontSize: 15 }}>{notification.message}</Text>
        <Flex gap={1} alignItems={'center'}>
          <Clock size={12} color={theme.colors.text.secondary} />
          <Text style={{ fontSize: 11, color: theme.colors.text.secondary }}>
            {parseDate(notification.timestamp)}
          </Text>
        </Flex>
      </Flex>
    </NotificationContainer>
  );
};

export default NotificationFeedItem;
