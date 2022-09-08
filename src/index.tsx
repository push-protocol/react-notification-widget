import React from 'react';
import NotificationBell from './components/NotificationBell';
import NotificationFeedProvider, {
  NotificationFeedProviderProps,
} from './components/NotificationFeedProvider';
import { Notification } from './context/NotificationsContext';
import { CustomTheme } from './theme';
import NotificationFeed from 'components/NotificationFeed';

export {
  CustomTheme,
  Notification,
  NotificationFeed,
  NotificationFeedProvider,
  NotificationFeedProviderProps,
  NotificationBell,
};
