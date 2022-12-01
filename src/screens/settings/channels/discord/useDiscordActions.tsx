import { useEffect } from 'react';
import { useNotificationsContext } from 'context/NotificationsContext';
import {
  useDeleteUserDiscordMutation,
  useVerifyUserDiscordMutation,
} from 'screens/settings/operations.generated';
import { UserCommunicationChannelsDocument } from 'context/NotificationsContext/operations.generated';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import analytics from 'services/analytics';

const useDiscordActions = () => {
  const { isSubscribeOnly } = useEnvironment();
  const { login, isOnboarding, setIsOnboarding, discordToken } = useAuthContext();
  const { setRoute, routeProps } = useRouterContext();
  const { userCommsChannels } = useNotificationsContext();

  const [deleteDiscord, { loading: deleteLoading }] = useDeleteUserDiscordMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
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
      } else {
        setRoute(Routes.Settings);
      }

      setIsOnboarding(false);
    });
  };

  useEffect(() => {
    if (discordToken && userCommsChannels && !userCommsChannels?.discord?.exists) {
      handleVerify(discordToken);
    }
  }, [discordToken]);

  const handleRemove = async () => {
    login(async () => {
      const response = await deleteDiscord();

      if (response?.data?.userDiscordDelete?.success) {
        analytics.track('discord deleted');
        return setRoute(Routes.Settings, { isSubscriber: routeProps?.isSubscriber });
      }
    });
  };

  return {
    deleteDiscordLoading: deleteLoading,
    handleRemove,
    handleVerify,
    verifyLoading,
    isConnected: userCommsChannels?.discord?.exists,
    hint: userCommsChannels?.discord?.hint || '',
  };
};

export default useDiscordActions;
