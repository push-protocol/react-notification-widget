import { useEffect } from 'react';
import { useNotificationsContext } from 'context/NotificationsContext';
import { UserCommunicationChannelsDocument } from 'context/NotificationsContext/operations.generated';
import analytics from 'services/analytics';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import {
  useDeleteChannelMutation,
  useGetTelegramVerificationLinkMutation,
} from 'components/Channels/operations.generated';
import { MessagingApp } from 'global/types.generated';

const useTelegramActions = () => {
  const { isSubscribeOnly } = useEnvironment();
  const { login, isOnboarding, setIsOnboarding } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { setUserCommsChannelsPollInterval, userCommsChannels } = useNotificationsContext();

  const [getTelegramLink, { loading: telegramLoading, data: telegramUrlData }] =
    useGetTelegramVerificationLinkMutation();

  const [deleteTelegramIntegration, { loading: deleteLoading }] = useDeleteChannelMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
    variables: {
      input: {
        app: MessagingApp.Telegram,
      },
    },
  });

  const handleRemoveTelegramIntegration = async () => {
    login(async () => {
      const response = await deleteTelegramIntegration();

      if (response?.data?.userCommunicationsChannelDelete?.success) {
        await getTelegramLink();
        analytics.track('telegram integration removed');
        return setRoute(Routes.Settings);
      }
    });
  };

  const handleGenerateUrl = async () => {
    login(async () => {
      analytics.track('telegram url generated');
      await getTelegramLink();
    });
  };

  const handleOpenTG = async () => {
    setUserCommsChannelsPollInterval(5000);
    window.open(
      telegramUrlData?.telegramVerificationLinkGenerate?.link,
      '_blank',
      'noopener,noreferrer'
    );
  };

  useEffect(() => {
    if (userCommsChannels?.telegram?.exists) {
      setUserCommsChannelsPollInterval(0);

      if (isSubscribeOnly) return;

      if (isOnboarding) {
        // This will redirect user from onBoarding to feed if user has already has telegram integrated
        setRoute(Routes.ChannelAdded, { channel: 'Telegram' });
      }

      setIsOnboarding(false);
    }
  }, [setUserCommsChannelsPollInterval, userCommsChannels]);

  return {
    telegramLoading,
    deleteLoading,
    telegramVerificationUrl: telegramUrlData?.telegramVerificationLinkGenerate?.link,
    handleGenerateUrl,
    handleOpenTG,
    handleRemoveTelegramIntegration,
    isConnected: userCommsChannels?.telegram?.exists,
    hint: userCommsChannels?.telegram?.hint || '',
  };
};

export default useTelegramActions;
