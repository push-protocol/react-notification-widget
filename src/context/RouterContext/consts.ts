import { ElementType } from 'react';
import {
  Subscribe,
  Settings,
  Feed,
  ChannelAdded,
  SetupChannels,
  SubscriptionFlowEnded,
  SetupPreferences,
  Login,
} from '../../screens';
import { ConnectWallet } from '../../screens/connectWallet';

enum Routes {
  Subscribe = 'Subscribe',
  Settings = 'Settings',
  ChannelAdded = 'ChannelAdded',
  SetupChannels = 'SetupChannels',
  SetupPreferences = 'SetupPreferences',
  NotificationsFeed = 'NotificationsFeed',
  SubscriptionFlowEnded = 'SubscriptionFlowEnded',
  Login = 'Login',
  ConnectWallet = 'ConnectWallet',
}

type Route = {
  Component: ElementType;
  requiresAuth: boolean;
  name: Routes;
};

const RouteConfig: Record<Routes, Route> = {
  [Routes.Subscribe]: {
    Component: Subscribe,
    requiresAuth: false,
    name: Routes.Subscribe,
  },
  [Routes.Settings]: {
    Component: Settings,
    requiresAuth: true,
    name: Routes.Settings,
  },
  [Routes.NotificationsFeed]: {
    Component: Feed,
    requiresAuth: true,
    name: Routes.NotificationsFeed,
  },
  [Routes.ChannelAdded]: {
    Component: ChannelAdded,
    requiresAuth: false,
    name: Routes.ChannelAdded,
  },
  [Routes.SetupChannels]: {
    Component: SetupChannels,
    requiresAuth: false,
    name: Routes.SetupChannels,
  },
  [Routes.SetupPreferences]: {
    Component: SetupPreferences,
    requiresAuth: false,
    name: Routes.SetupPreferences,
  },
  [Routes.SubscriptionFlowEnded]: {
    Component: SubscriptionFlowEnded,
    requiresAuth: false,
    name: Routes.SubscriptionFlowEnded,
  },
  [Routes.Login]: {
    Component: Login,
    requiresAuth: false,
    name: Routes.Login,
  },
  [Routes.ConnectWallet]: {
    Component: ConnectWallet,
    requiresAuth: false,
    name: Routes.ConnectWallet,
  },
};

export { RouteConfig, Routes, Route };
