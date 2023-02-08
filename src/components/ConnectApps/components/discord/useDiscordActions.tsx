import { useEffect } from 'react';
import {
  useDeleteChannelMutation,
  useVerifyUserDiscordMutation,
} from '../../../ConnectApps/operations.generated';
import analytics from 'services/analytics';
import { MessagingApp } from 'global/types.generated';
import { useUserContext } from 'context/UserContext';
import { UserCommunicationChannelsDocument } from 'context/UserContext/operations.generated';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useChannelContext } from 'context/ChannelContext';

const useDiscordActions = () => {
  const { isSubscribeOnlyMode } = useEnvironment();
  const { discordGuildUrl } = useChannelContext();
  const { login, setIsOnboarding, discordToken } = useAuthContext();
  const { userCommsChannels } = useUserContext();

  const [deleteDiscord, { loading: deleteLoading }] = useDeleteChannelMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
    variables: {
      input: {
        app: MessagingApp.Discord,
      },
    },
  });

  const [verifyDiscord, verifyData] = useVerifyUserDiscordMutation({
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

      if (isSubscribeOnlyMode) return;

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
      }
    });
  };

  return {
    deleteLoading,
    handleRemove,
    handleVerify,
    verifyData,
    handleOpenDiscord,
    hint: userCommsChannels?.discord?.hint || '',
  };
};

export default useDiscordActions;
