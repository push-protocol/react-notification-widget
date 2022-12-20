import React from 'react';
import NotificationBell, { NotificationBellProps } from './components/NotificationBell';
import NotificationFeedProvider, {
  NotificationFeedProviderProps,
} from './components/NotificationFeedProvider';
import { CustomTheme } from './theme';
import { Notification } from './context/UserContext/types';
import NotificationFeed, { NotificationFeedProps } from './components/NotificationFeed';
import { WidgetMode } from './context/EnvironmentContext';

export {
  NotificationFeed,
  NotificationFeedProvider,
  NotificationBell,
  CustomTheme,
  NotificationFeedProviderProps,
  NotificationBellProps,
  NotificationFeedProps,
  Notification,
  WidgetMode,
};
