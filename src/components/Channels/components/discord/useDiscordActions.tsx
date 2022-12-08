import { useEffect } from 'react';
import { useNotificationsContext } from 'context/NotificationsContext';
import { UserCommunicationChannelsDocument } from 'context/NotificationsContext/operations.generated';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import analytics from 'services/analytics';
import { useChannelContext } from 'context/ChannelContext';
import {
  useDeleteChannelMutation,
  useVerifyUserDiscordMutation,
} from 'components/Channels/operations.generated';
import { MessagingApp } from 'global/types.generated';

const useDiscordActions = () => {
  const { isSubscribeOnly } = useEnvironment();
  const { discordGuildUrl } = useChannelContext();
  const { login, isOnboarding, setIsOnboarding, discordToken } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { userCommsChannels } = useNotificationsContext();

  const [deleteDiscord, { loading: deleteLoading }] = useDeleteChannelMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
    variables: {
      input: {
        app: MessagingApp.Discord,
      },
    },
  });

  const [verifyDiscord, { loading: verifyLoading }] = useVerifyUserDiscordMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
  });

  const handleVerify = async (token: string) => {
    login(async () => {
      await verifyDiscord({
        variables: {
          input: {
            token,
          },
        },
      });
      analytics.track('discord verified');

      if (isSubscribeOnly) return;

      if (isOnboarding) {
        setRoute(Routes.ChannelAdded, { channel: 'Discord' });
      }

      setIsOnboarding(false);
    });
  };

  const handleOpenDiscord = async () => {
    if (discordGuildUrl) {
      window.open(discordGuildUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    if (discordToken && userCommsChannels && !userCommsChannels.discord?.exists) {
      handleVerify(discordToken);
    }
  }, [discordToken]);

  const handleRemove = async () => {
    login(async () => {
      const response = await deleteDiscord();

      if (response?.data?.userCommunicationsChannelDelete?.success) {
        analytics.track('discord deleted');
        return setRoute(Routes.Settings);
      }
    });
  };

  return {
    deleteLoading,
    handleRemove,
    handleVerify,
    verifyLoading,
    handleOpenDiscord,
    discordGuildUrl,
    isConnected: userCommsChannels?.discord?.exists,
    hint: userCommsChannels?.discord?.hint || '',
  };
};

export default useDiscordActions;
