import NotificationBell, { type NotificationBellProps } from './components/NotificationBell';
import NotificationFeedProvider, {
  NotificationFeedProviderProps,
} from 'components/NotificationFeedProvider';
import { ThemeMode, type CustomTheme } from './theme';
import type { Notification } from 'context/UserContext/types';
import NotificationFeed, { NotificationFeedProps } from './components/NotificationFeed';
import { WidgetMode } from 'context/EnvironmentContext';
import type { CustomSigner } from 'context/SignerContext';

export { NotificationFeed, NotificationFeedProvider, NotificationBell, ThemeMode, WidgetMode };

export type {
  CustomSigner,
  CustomTheme,
  NotificationFeedProviderProps,
  NotificationBellProps,
  NotificationFeedProps,
  Notification,
};
