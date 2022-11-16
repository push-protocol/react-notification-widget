import React, { useEffect } from 'react';
import { useNotificationsContext } from 'context/NotificationsContext';
import SettingsItem from 'screens/settings/components/SettingsItem';
import { Telegram as TelegramIcon } from 'components/icons';
import {
  useDeleteTelegramIntegrationMutation,
  useGetTelegramVerificationLinkMutation,
} from 'screens/settings/operations.generated';
import { UserCommunicationChannelsDocument } from 'context/NotificationsContext/operations.generated';
import analytics from 'services/analytics';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import ConnectTelegram from 'screens/settings/channels/telegram/ConnectTelegram';

export const TelegramChannel = () => {
  const { login } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { setUserCommsChannelsPollInterval, userCommsChannels } = useNotificationsContext();

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
    }
  }, [setUserCommsChannelsPollInterval, userCommsChannels]);

  return (
    <SettingsItem
      title={'Telegram'}
      icon={<TelegramIcon />}
      connected={userCommsChannels?.telegram?.exists}
    >
      <ConnectTelegram
        url={telegramUrlData?.telegramVerificationLinkGenerate?.link}
        onGenerateUrl={handleGenerateUrl}
        onOpenTg={handleOpenTG}
        onRemoveTelegram={handleRemoveTelegramIntegration}
        loading={telegramLoading || deleteTelegramLoading}
      />
    </SettingsItem>
  );
};
