import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useEnvironment } from '../EnvironmentContext';
import { useChannelContext } from '../ChannelContext';
import { UserContext, Notification } from './types';
import { useUserCommunicationChannelsLazyQuery } from './operations.generated';
import fetchNotifications from './fetchNotifications';
import useChannelPreferences from 'context/UserContext/useChannelPreferences';

const UserContext = createContext<UserContext>({} as any);

export const UserProvider = ({ children, isOpen }: { children: ReactNode; isOpen?: boolean }) => {
  const { isConnected: isLoggedIn, address: userAddress } = useAccount();
  const { epnsEnv } = useEnvironment();
  const { channelAddress, chainId } = useChannelContext();

  const [feedOpen, setFeedOpen] = useState(isOpen || false);
  const [isLoading, setIsLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userCommsChannelsPollInterval, setUserCommsChannelsPollInterval] = useState(0);

  const {
    preferences,
    handleUpdateUserPreferences,
    userPreferencesCount,
    userPreferencesLoading,
    fetchUserPreferences,
  } = useChannelPreferences();

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
      try {
        const newNotifs = await fetchNotifications(`eip155:${chainId}:${userAddress}`, chainId);
        setNotifications(newNotifs || notifications);
      } catch (e) {
        return;
      }
    }, 4000);

    setPolling(true);

    return () => {
      setPolling(false);
      clearInterval(timeout);
    };
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
    if (isOpen !== undefined) return; // ignore if controlled through prop
    setFeedOpen(open);
  };

  useEffect(() => {
    if (isOpen !== undefined) {
      setFeedOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        feedOpen,
        setFeedOpen: toggleFeedOpen,
        userCommsChannels: data?.userCommunicationChannels,
        setUserCommsChannelsPollInterval,
        notifications,
        userAddress,
        preferences,
        handleUpdateUserPreferences,
        userPreferencesCount,
        userPreferencesLoading,
        fetchUserPreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
