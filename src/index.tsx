import React from 'react';
import NotificationBell, { NotificationBellProps } from './components/NotificationBell';
import NotificationFeedProvider, {
  NotificationFeedProviderProps,
} from './components/NotificationFeedProvider';
import { CustomTheme } from './theme';
import { Notification } from './context/NotificationsContext/types';
import NotificationFeed, { NotificationFeedProps } from './components/NotificationFeed';

export {
  NotificationFeed,
  NotificationFeedProvider,
  NotificationBell,
  CustomTheme,
  NotificationFeedProviderProps,
  NotificationBellProps,
  NotificationFeedProps,
  Notification,
};
