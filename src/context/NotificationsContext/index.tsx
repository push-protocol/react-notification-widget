import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useEnvironment } from '../EnvironmentContext';
import { useChannelContext } from '../ChannelContext';
import { NotificationsContext, Notification } from './types';
import { useUserCommunicationChannelsLazyQuery } from './operations.generated';
import fetchNotifications from './fetchNotifications';

const NotificationsContext = createContext<NotificationsContext>({} as any);

export const NotificationsProvider = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen?: boolean;
}) => {
  const { isConnected: isLoggedIn, address: userAddress } = useAccount();
  const { epnsEnv } = useEnvironment();
  const { channelAddress, chainId } = useChannelContext();

  const [feedOpen, setFeedOpen] = useState(isOpen || false);
  const [isLoading, setIsLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userCommsChannelsPollInterval, setUserCommsChannelsPollInterval] = useState(0);

  const [getCommsChannels, { data }] = useUserCommunicationChannelsLazyQuery({
    pollInterval: userCommsChannelsPollInterval,
  });

  useEffect(() => {
    if (!userAddress) return;

    getCommsChannels({ variables: { address: userAddress } });
  }, [getCommsChannels, userAddress]);

  useEffect(() => {
    if (!userAddress || polling || !chainId) return;

    const timeout = setInterval(async () => {
      const notifs = await fetchNotifications(`eip155:${chainId}:${userAddress}`, chainId);
      setNotifications(notifs || []);
    }, 4000);

    setPolling(true);

    return () => clearInterval(timeout);
  }, [userAddress, chainId]);

  useEffect(() => {
    if (!userAddress || !channelAddress) return;

    const run = async () => {
      setIsLoading(true);
      const notifs = await fetchNotifications(`eip155:${chainId}:${userAddress}`, chainId);
      setNotifications(notifs || []);
      setIsLoading(false);
    };

    run();
  }, [channelAddress, chainId, epnsEnv, userAddress]);

  const toggleFeedOpen = (open: boolean) => {
    if (isOpen !== undefined) return;
    setFeedOpen(open);
  };

  useEffect(() => {
    if (isOpen !== undefined) {
      setFeedOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <NotificationsContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        feedOpen,
        setFeedOpen: toggleFeedOpen,
        userCommsChannels: data?.userCommunicationChannels,
        setUserCommsChannelsPollInterval,
        notifications,
        userAddress,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotificationsContext() {
  return useContext(NotificationsContext);
}
