import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { EpnsNotification } from 'context/NotificationsContext';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';

const Container = styled(Flex)`
  border-bottom: 1px solid #2e3646;
  padding: 8px 0;
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

type NotificationFeedItemProps = {
  notification: EpnsNotification;
};

const NotificationFeedItem = ({ notification }: NotificationFeedItemProps) => {
  return (
    <Container direction={'column'} gap={0.5}>
      <Text size={'lg'} weight={700}>
        {notification.title}
      </Text>
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
          <Text size={'sm'} color={'secondary'} opacity={0.2}>
            {notification?.url}
          </Text>
        )}
      </Flex>
    </Container>
  );
};

export default NotificationFeedItem;
