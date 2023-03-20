import { ElementType } from "react";
import {
  Subscribe,
  Settings,
  Feed,
  ChannelAdded,
  SetupApps,
  SubscriptionFlowEnded,
  SelectApps,
  SelectCategories,
  VerifyAccount,
} from "../../screens";

enum Routes {
  Subscribe = "Subscribe",
  Settings = "Settings",
  ChannelAdded = "ChannelAdded",
  SetupApps = "SetupApps",
  SelectCategories = "SelectCategories",
  SelectApps = "SelectApps",
  NotificationsFeed = "NotificationsFeed",
  SubscriptionFlowEnded = "SubscriptionFlowEnded",
  VerifyAccount = "VerifyAccount",
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
  [Routes.SetupApps]: {
    Component: SetupApps,
    requiresAuth: false,
    name: Routes.SetupApps,
  },
  [Routes.SelectCategories]: {
    Component: SelectCategories,
    requiresAuth: false,
    name: Routes.SelectCategories,
  },
  [Routes.SelectApps]: {
    Component: SelectApps,
    requiresAuth: false,
    name: Routes.SelectApps,
  },
  [Routes.SubscriptionFlowEnded]: {
    Component: SubscriptionFlowEnded,
    requiresAuth: false,
    name: Routes.SubscriptionFlowEnded,
  },
  [Routes.VerifyAccount]: {
    Component: VerifyAccount,
    requiresAuth: false,
    name: Routes.VerifyAccount,
  },
};

export { RouteConfig, Routes, Route };
