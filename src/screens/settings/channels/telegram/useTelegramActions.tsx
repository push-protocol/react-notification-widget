import { useEffect } from 'react';
import { useNotificationsContext } from 'context/NotificationsContext';
import {
  useDeleteTelegramIntegrationMutation,
  useGetTelegramVerificationLinkMutation,
} from 'screens/settings/operations.generated';
import { UserCommunicationChannelsDocument } from 'context/NotificationsContext/operations.generated';
import analytics from 'services/analytics';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';

const useTelegramActions = () => {
  const { login } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { setUserCommsChannelsPollInterval, userCommsChannels } = useNotificationsContext();
  const { isFirstLogin, setIsFirstLogin } = useAuthContext();

  const [getTelegramLink, { loading: telegramLoading, data: telegramUrlData }] =
    useGetTelegramVerificationLinkMutation();

  const [deleteTelegramIntegration, { loading: deleteTelegramLoading }] =
    useDeleteTelegramIntegrationMutation({
      refetchQueries: [UserCommunicationChannelsDocument],
    });

  const handleRemoveTelegramIntegration = async () => {
    login(async () => {
      const response = await deleteTelegramIntegration();

      if (response?.data?.userTelegramDelete?.success) {
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

      if (isFirstLogin) {
        // This will redirect user from onBoarding to feed if user has already has telegram integrated
        setIsFirstLogin(false);
        setRoute(Routes.NotificationsFeed);
      }
    }
  }, [setUserCommsChannelsPollInterval, userCommsChannels]);

  return {
    telegramLoading,
    deleteTelegramLoading,
    telegramVerificationUrl: telegramUrlData?.telegramVerificationLinkGenerate?.link,
    handleGenerateUrl,
    handleOpenTG,
    handleRemoveTelegramIntegration,
    isConnected: userCommsChannels?.telegram?.exists,
    hint: userCommsChannels?.telegram?.hint || '',
  };
};

export default useTelegramActions;
