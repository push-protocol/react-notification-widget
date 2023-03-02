import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useEnsName } from 'wagmi';
import { useEnvironment } from '../EnvironmentContext';
import { useChannelContext } from '../ChannelContext';
import { useAuthContext } from '../AuthContext';
import { useSignerContext } from '../SignerContext';
import { UserContext, Notification } from './types';
import fetchNotifications from './fetchNotifications';
import { useUserCommunicationChannelsLazyQuery, useGetUserLazyQuery } from './operations.generated';

const UserContexts = createContext<UserContext>({} as any);

export const UserProvider = ({ children, isOpen }: { children: ReactNode; isOpen?: boolean }) => {
  const { isLoggedIn, loggedInAddress } = useAuthContext(); // requires the actual account that was used to sign the auth msg, not the connected wallet
  const { address: userAddress } = useSignerContext();
  const { data: userEns } = useEnsName({ address: userAddress });
  const { epnsEnv } = useEnvironment();
  const { channelAddress, chainId } = useChannelContext();

  const [feedOpen, setFeedOpen] = useState(isOpen || false);
  const [isLoading, setIsLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userCommsChannelsPollInterval, setUserCommsChannelsPollInterval] = useState(0);

  const [fetchUser, { data: userData }] = useGetUserLazyQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network', // important for account switches and cache updates
  });

  useEffect(() => {
    if (!isLoggedIn) return;

    fetchUser();
  }, [loggedInAddress, isLoggedIn]);

  const [fetchCommsChannels, { data }] = useUserCommunicationChannelsLazyQuery({
    pollInterval: userCommsChannelsPollInterval,
    nextFetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!loggedInAddress) return;

    fetchCommsChannels({ variables: { address: loggedInAddress } });
  }, [fetchCommsChannels, loggedInAddress]);

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
    <UserContexts.Provider
      value={{
        isLoading,
        feedOpen,
        user: userData?.user,
        setFeedOpen: toggleFeedOpen,
        userCommsChannels: data?.userCommunicationChannels,
        setUserCommsChannelsPollInterval,
        userCommsChannelsPollInterval,
        notifications,
        userEns,
        userAddress,
      }}
    >
      {children}
    </UserContexts.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContexts);
}
