import React, { useMemo, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import FeedNavigation, { NavigationTabs } from '../../screens/feed/components/FeedNavigation';
import { useEnvironment } from '../../context/EnvironmentContext';
import EmptyState from './components/EmptyState';
import NotificationFeedItem from './components/NotificationFeedItem';
import analytics from 'services/analytics';
import { useUserContext } from 'context/UserContext';
import { useChannelContext } from 'context/ChannelContext';
import { Notification } from 'context/UserContext/types';
import { Routes, useRouterContext } from 'context/RouterContext';
import { Screen } from 'components/layout/Screen';
import { Settings } from 'components/icons';
import { NotificationClickProp } from 'components/types';
import Flex from 'components/layout/Flex';
import Spinner from 'components/Spinner';

const NOTIFS_PER_PAGE = 10;

const animateIn = keyframes`
  0% {
    opacity: 0;
    top: 30px;
  }
  100% {
    opacity: 1;
    top: 0;
  }
`;

const NotificationAnimation = styled.div<{ delay: number }>`
  position: relative;
  animation: ${({ delay }) =>
    css`
      ${animateIn} ${delay * 0.1}s ease-in
    `};
`;

const NotificationFeed = styled(Flex)`
  ${({ theme }) => `@media (max-width: ${theme.w.breakpoints.mobile}px) {
    max-height: 100%;
  }`}
  &:not(:last-child) {
    border-bottom: ${({ theme }) => `1px solid ${theme.w.colors.border.main}}`};
  }
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100% + 18px);
  box-sizing: border-box;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
`;

const SettingsIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  color: ${({ theme }) => theme.w.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    animation: ${spin} 0.5s ease-in;
  }
`;

export const Feed = ({ onNotificationClick }: NotificationClickProp) => {
  const { notifications: allNotifications, isLoading } = useUserContext();
  const { channelAddress } = useChannelContext();
  const { setRoute } = useRouterContext();
  const { isSubscribeOnlyMode } = useEnvironment();
  const [activeTab, setActiveTab] = useState(NavigationTabs.App);
  const [page, setPage] = useState(0);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const handleViewSettings = () => {
    setRoute(Routes.Settings);
  };

  const [channelNotifs, otherNotifs] = useMemo(() => {
    const channel: Notification[] = [];
    const other: Notification[] = [];

    allNotifications.forEach((notif) =>
      notif.appAddress.toLowerCase() === channelAddress.toLowerCase()
        ? channel.push(notif)
        : other.push(notif)
    );

    return [channel, other];
  }, [allNotifications]);

  const tabNotifs = isSubscribeOnlyMode
    ? allNotifications
    : activeTab === NavigationTabs.App
    ? channelNotifs
    : otherNotifs;

  const notificationsToShow = useMemo(() => {
    return tabNotifs.slice(0, page * NOTIFS_PER_PAGE + NOTIFS_PER_PAGE);
  }, [activeTab, page, tabNotifs]);

  const handleTabSwitch = (tab: NavigationTabs) => {
    analytics.track('notifications tab switch', { tab });

    if (feedRef.current?.scrollTop) {
      feedRef.current.scrollTop = 0;
    }

    setPage(0);
    setActiveTab(tab);
  };

  return (
    <Screen
      title={'Notifications'}
      navbarActionComponent={
        <SettingsIcon onClick={handleViewSettings}>
          <Settings />
        </SettingsIcon>
      }
    >
      {!!otherNotifs?.length && !isSubscribeOnlyMode && (
        <FeedNavigation activeTab={activeTab} setActiveTab={handleTabSwitch} />
      )}

      <NotificationFeed ref={feedRef} width={'100%'} direction={'column'} gap={2}>
        <EmptyState show={!isLoading && !notificationsToShow?.length} />
        {isLoading ? (
          <Flex height={150} justifyContent={'center'} alignItems={'center'} pb={3}>
            <Spinner />
          </Flex>
        ) : (
          <InfiniteScroll
            loadMore={() => setPage((currPage) => currPage + 1)}
            useWindow={false}
            hasMore={!!tabNotifs[notificationsToShow.length]}
          >
            {notificationsToShow.map((notification, index) => (
              <NotificationAnimation
                key={`${index}-${notification.timestamp}`}
                delay={index / (page || 1)}
              >
                <NotificationFeedItem
                  onNotificationClick={onNotificationClick}
                  notification={notification}
                  showSenderDetails={isSubscribeOnlyMode || activeTab === NavigationTabs.Other}
                />
              </NotificationAnimation>
            ))}
          </InfiniteScroll>
        )}
      </NotificationFeed>
    </Screen>
  );
};
