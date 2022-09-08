import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import * as epns from '@epnsproject/sdk-restapi';
import dayjs from 'dayjs';
import { useEnvironment } from '../EnvironmentContext';
import { useChannelContext } from '../ChannelContext';
import { EpnsNotificationRawResp, NotificationsContext, Notification } from './types';
import { useUserCommunicationChannelsLazyQuery } from './operations.generated';

const NotificationsContext = createContext<NotificationsContext>({
  isLoggedIn: false,
  isLoading: false,
  notifications: [],
} as NotificationsContext);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected: isLoggedIn, address: userAddress } = useAccount();
  const { chainId, epnsEnv } = useEnvironment();
  const { channel } = useChannelContext();

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [getCommsChannels, { data }] = useUserCommunicationChannelsLazyQuery();

  useEffect(() => {
    if (!userAddress) return;

    getCommsChannels({ variables: { address: userAddress } });
  }, [userAddress]);

  useEffect(() => {
    if (!userAddress || !channel) return;

    setIsLoading(true);
    epns.user
      .getFeeds({
        raw: true,
        user: `eip155:${chainId}:${userAddress}`,
        env: epnsEnv,
        page: 1,
        limit: 1000,
      })
      .then((result: EpnsNotificationRawResp[]) => {
        const notifs = result
          ?.map(epnsNotifToNotif)
          .filter((notif) => notif.appAddress.toLowerCase() === channel.toLowerCase());
        setNotifications(notifs || []);
        setIsLoading(false);
      });
  }, [channel, chainId, epnsEnv, userAddress]);

  return (
    <NotificationsContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        userCommsChannels: data?.userCommunicationChannels,
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

const epnsNotifToNotif = ({
  epoch,
  sender,
  payload: { data },
}: EpnsNotificationRawResp): Notification => ({
  title: data.asub,
  message: data.amsg,
  appName: data.app,
  appAddress: sender,
  icon: data.icon,
  url: data.url,
  image: data.aimg,
  cta: data.acta,
  timestamp: dayjs(epoch).toDate(),
});
