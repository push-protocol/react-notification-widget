import React from 'react';
import dayjs, { extend } from 'dayjs';
import styled, { DefaultTheme } from 'styled-components';
import relativeTime from 'dayjs/plugin/relativeTime';
import snarkdown from 'snarkdown';
import domPurify from 'dompurify';
import analytics from '../../../services/analytics';
import parseEpnsFormatting from '../helpers/parseEpnsFormatting';
import { mode } from 'theme';
import { NotificationClickProp } from 'components/types';
import { changeColorShade } from 'components/utils';
import { Notification } from 'context/UserContext/types';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import Link from 'components/Link';
import { Globe } from 'components/icons';
import getDomain from 'helpers/functions/getDomain';
import VideoPlayer, { isVideoUrl } from 'components/VideoPlayer';

extend(relativeTime);

const Container = styled(Flex)<{ clickable: boolean; theme: DefaultTheme }>`
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'cursor')};
  padding: 12px;
  border-radius: ${({ theme }) => theme.w.borderRadius.md};
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${({ theme, clickable }) =>
      clickable ? mode(theme.w.colors.light[10], theme.w.colors.dark[10]) : undefined};
  }
`;

const NotificationTitle = styled(Text)`
  word-break: break-word;
`;

const SenderImageContainer = styled.div`
  background: ${({ theme }) => theme.w.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  overflow: hidden;
  border-radius: 100px;
  margin-right: 6px;
`;

const SenderImage = styled.img`
  object-fit: contain;
  width: 100%;
`;

const UnreadNotification = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 100px;
  position: absolute;
  left: -10px;
  background: ${({ theme }) => theme.w.colors.primary.light};
  cursor: pointer;
  &:active {
    background: ${({ theme }) => changeColorShade(theme.w.colors.primary.light, -20)};
  }
`;

const Message = styled(Text)`
  white-space: break-spaces;
  word-break: break-word;

  ol,
  ul {
    list-style-position: inside;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const NotificationImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.w.borderRadius.md};
`;

const IconContainer = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
`;

type NotificationFeedItemProps = NotificationClickProp & {
  notification: Notification;
  showSenderDetails: boolean;
};

const NotificationFeedItem = ({
  notification,
  showSenderDetails,
  onNotificationClick,
}: NotificationFeedItemProps) => {
  const isUnread = dayjs(notification.timestamp).isAfter(dayjs()); //TODO: update with correct logic

  const handleNotificationClick = () => {
    analytics.track('notification clicked', { notification });

    if (onNotificationClick) {
      return onNotificationClick(notification);
    }

    if (notification.cta) {
      const isCurrentDomain = getDomain(notification.cta) === getDomain(window.location.origin);

      window.open(notification.cta, isCurrentDomain ? '_self' : '_blank');
    }
  };

  const getRelativeTime = (date: Date) => {
    if (dayjs(date) > dayjs(new Date()).subtract(1, 'minute')) {
      return 'just now';
    }

    return dayjs(date).fromNow();
  };

  const sanitizedMessage = domPurify.sanitize(snarkdown(parseEpnsFormatting(notification.message)));

  return (
    <Container clickable={!!notification.cta} onClick={handleNotificationClick}>
      {showSenderDetails && (
        //div required for margins and sizes to work correctly
        <div>
          <SenderImageContainer>
            <SenderImage src={notification.senderLogo} alt={''} />
          </SenderImageContainer>
        </div>
      )}
      <Flex width={'100%'} direction={'column'}>
        <Flex direction={'column'} gap={0.5}>
          {showSenderDetails && (
            <Text size={'md'} color={'secondary'} weight={500}>
              {notification.appName}
            </Text>
          )}
          <NotificationTitle size={'lg'} weight={700}>
            {notification.title}
          </NotificationTitle>
        </Flex>

        <Message
          mt={1}
          mb={1}
          size={'md'}
          weight={500}
          dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
        />

        {notification.image &&
          (isVideoUrl(notification.image) ? (
            <VideoPlayer url={notification.image} />
          ) : (
            <ImageContainer>
              <NotificationImage src={notification.image} alt="notification image" />
            </ImageContainer>
          ))}
        <Flex justifyContent={'space-between'}>
          <Text size={'sm'} color={'secondary'}>
            {getRelativeTime(notification.timestamp)}
          </Text>
          {notification?.cta && (
            <Flex gap={0.5} alignItems={'center'}>
              <Link src={notification.cta}>
                <IconContainer>
                  <Globe />
                </IconContainer>
              </Link>
              <Link src={notification.cta}>
                <Text size={'sm'} color={'secondary'}>
                  {getDomain(notification.cta)}
                </Text>
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
      {isUnread && <UnreadNotification />}
    </Container>
  );
};

export default NotificationFeedItem;
