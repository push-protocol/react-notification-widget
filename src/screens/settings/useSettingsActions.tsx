import { useState } from 'react';
import { SettingsViews } from 'screens/settings/index';
import { useNotificationsContext } from 'context/NotificationsContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import { useChannelContext } from 'context/ChannelContext';

export enum Channels {
  EMAIL,
  DISCORD,
  TELEGRAM,
}

const useSettingsActions = () => {
  const { isWrongNetwork } = useChannelContext();

  const { isSubscribeOnly } = useEnvironment();
  const { isOnboarding, unsubscribe } = useAuthContext();
  const { routeProps, setRoute } = useRouterContext();
  const { userCommsChannels } = useNotificationsContext();

  const [channelOpen, setChannelOpen] = useState<Channels | undefined>(
    isOnboarding ? Channels.EMAIL : undefined
  );

  const toggleChannelOpen = (channel: Channels) => {
    if (isWrongNetwork) return;
    channelOpen === channel ? setChannelOpen(undefined) : setChannelOpen(channel);
  };

  const handleUnsubscribe = () => {
    unsubscribe();
  };

  const handleFinalizeSubscription = () => {
    setRoute(Routes.SubscribeOnlyNotice);
  };

  const getSettingsView = () => {
    if (isSubscribeOnly) {
      return routeProps?.isSubscriber
        ? SettingsViews.SUBSCRIBE_ONLY_COMPLETED
        : SettingsViews.SUBSCRIBE_ONLY;
    } else {
      return isOnboarding ? SettingsViews.ONBOARDING : SettingsViews.DEFAULT;
    }
  };

  const renderFinalizeButton =
    getSettingsView() === SettingsViews.SUBSCRIBE_ONLY &&
    (!!userCommsChannels?.email?.exists || !!userCommsChannels?.telegram?.exists);

  return {
    channelOpen,
    toggleChannelOpen,
    view: getSettingsView(),
    renderFinalizeButton,
    handleFinalizeSubscription,
    handleUnsubscribe,
  };
};

export default useSettingsActions;
