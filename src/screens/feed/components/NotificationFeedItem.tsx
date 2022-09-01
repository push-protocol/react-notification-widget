import React from 'react';
import dayjs, { extend } from 'dayjs';
import styled from 'styled-components';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EpnsNotification } from 'context/NotificationsContext';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import Link from 'components/Link';
import { Globe } from 'components/icons';

extend(relativeTime);

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
  overflow: hidden;
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
  showSenderDetails: boolean;
};

const NotificationFeedItem = ({ notification, showSenderDetails }: NotificationFeedItemProps) => {
  const isUnread = dayjs(notification.timestamp).isSame(new Date(), 'week'); //TODO: update with correct logic

  const markAsRead = () => {
    console.log('mark as read', notification.title); //TODO: handle mark as read without redirection
  };

  return (
    <Container direction={'column'} gap={0.5}>
      <Header gap={0.5} alignItems={'center'}>
        {showSenderDetails && <SenderImage />}
        <Flex direction={'column'}>
          {showSenderDetails && (
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
          {dayjs(notification.timestamp).fromNow()}
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