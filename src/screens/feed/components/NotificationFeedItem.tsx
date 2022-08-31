import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { EpnsNotification } from 'context/NotificationsContext';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import { NavigationTabs } from 'screens/feed/components/FeedNavigation';
import Link from 'components/Link';
import { Globe } from 'components/icons';

const Container = styled(Flex)`
  border-bottom: 1px solid #2e3646;
  padding: 8px 0;
`;

const Header = styled(Flex)`
  position: relative;
`;

const SenderImage = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primary.light};
  img {
    height: 100%;
    width: 100%;
  }
`;

const UnreadNotification = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 100px;
  position: absolute;
  left: -10px;
  background: ${({ theme }) => theme.colors.primary.light};
  cursor: pointer;
  &:active {
    background: ${({ theme }) => theme.colors.primary.lighter};
  }
`;

const Message = styled(Text)`
  white-space: break-spaces;
  word-break: break-word;
`;

const ImageContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;

const IconContainer = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
`;

type NotificationFeedItemProps = {
  notification: EpnsNotification;
  active: NavigationTabs;
};

const NotificationFeedItem = ({ notification, active }: NotificationFeedItemProps) => {
  const isAllPage = active === NavigationTabs.all;
  const isUnread = moment(notification.timestamp).isSame(new Date(), 'week'); //TODO: update with correct logic

  const markAsRead = () => {
    console.log('mark as read', notification.title); //TODO: handle mark as read without redirection
  };

  return (
    <Container direction={'column'} gap={0.5}>
      <Header gap={0.5} alignItems={'center'}>
        {isAllPage && <SenderImage />}
        <Flex direction={'column'}>
          {isAllPage && (
            <Text size={'md'} weight={500}>
              Sender
            </Text>
          )}
          <Text size={'lg'} weight={700}>
            {notification.title}
          </Text>
        </Flex>
        {isUnread && <UnreadNotification onClick={markAsRead} />}
      </Header>
      <Message size={'md'} weight={600}>
        {notification.message}
      </Message>
      <ImageContainer>
        <Image
          src={
            'https://gravita.ge/storage/321/conversions/MAD_Harbin_Opera_House_003_%C2%A9Adam_Mork-webp.webp'
          }
          alt="notification image"
        />
      </ImageContainer>
      <Flex justifyContent={'space-between'}>
        <Text size={'sm'} color={'secondary'} opacity={0.2}>
          {moment(notification.timestamp).fromNow()}
        </Text>
        {notification?.url && (
          <Flex gap={0.5} alignItems={'center'}>
            <Link url={notification?.url}>
              <IconContainer>
                <Globe />
              </IconContainer>
            </Link>
            <Link url={notification?.url}>
              <Text size={'sm'} color={'secondary'} opacity={0.2}>
                {notification?.url}
              </Text>
            </Link>
          </Flex>
        )}
      </Flex>
    </Container>
  );
};

export default NotificationFeedItem;
