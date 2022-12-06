import { useMemo, useState } from 'react';
import { SettingsViews } from 'screens/settings/index';
import { useNotificationsContext } from 'context/NotificationsContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import { useChannelContext } from 'context/ChannelContext';
import { MessagingApp } from 'global/types.generated';

const useSettingsActions = () => {
  const { isWrongNetwork } = useChannelContext();

  const { isSubscribeOnly } = useEnvironment();
  const { isOnboarding, unsubscribe } = useAuthContext();
  const { routeProps, setRoute } = useRouterContext();
  const { userCommsChannels } = useNotificationsContext();

  const [channelOpen, setChannelOpen] = useState<MessagingApp | undefined>(
    isOnboarding ? MessagingApp.Email : undefined
  );

  const toggleChannelOpen = (channel: MessagingApp) => {
    if (isWrongNetwork) return;
    channelOpen === channel ? setChannelOpen(undefined) : setChannelOpen(channel);
  };

  const handleUnsubscribe = () => {
    unsubscribe();
  };

  const handleFinalizeSubscription = () => {
    setRoute(Routes.SubscriptionFlowEnded);
  };

  const view = useMemo(() => {
    if (isSubscribeOnly) {
      return routeProps?.isSubscriber
        ? SettingsViews.SUBSCRIBE_ONLY_CONNECTED
        : SettingsViews.SUBSCRIBE_ONLY;
    } else {
      return isOnboarding ? SettingsViews.ONBOARDING : SettingsViews.DEFAULT;
    }
  }, [isSubscribeOnly, routeProps, isOnboarding]);

  const shouldRenderFinishButton =
    view === SettingsViews.SUBSCRIBE_ONLY &&
    (!!userCommsChannels?.email?.exists ||
      !!userCommsChannels?.telegram?.exists ||
      !!userCommsChannels?.discord?.exists);

  return {
    channelOpen,
    toggleChannelOpen,
    view,
    shouldRenderFinishButton,
    handleFinalizeSubscription,
    handleUnsubscribe,
  };
};

export default useSettingsActions;
