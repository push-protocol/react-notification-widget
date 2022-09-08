import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import * as epns from '@epnsproject/sdk-restapi';
import dayjs from 'dayjs';
import { useEnvironment } from './EnvironmentContext';
import { useChannelContext } from './ChannelContext';

export type Notification = {
  title: string;
  timestamp: Date;
  message: string;
  appName: string;
  appAddress: string;
  image?: string;
  icon?: string;
  url?: string;
  cta?: string;
};

type NotificationsContext = {
  notifications: Notification[];
  isLoggedIn: boolean;
  isLoading: boolean;
  userAddress?: string;
};

const NotificationsContext = createContext<NotificationsContext>({
  isLoggedIn: false,
  isLoading: false,
  notifications: [],
} as NotificationsContext);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected: isLoggedIn, address: userAddress } = useAccount();
  const { channel } = useChannelContext();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { chainId, epnsEnv } = useEnvironment();

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

type EpnsNotificationRawResp = {
  payload_id: number;
  sender: string;
  epoch: string;
  payload: EpnsNotifRawPayload;
  source: string;
  etime: any;
};

type EpnsNotifRawPayload = {
  data: EpnsNotifRawData;
  notification: EpnsNotifRawNotification;
};

type EpnsNotifRawData = {
  app: string;
  sid: string;
  url: string;
  acta: string;
  aimg: string;
  amsg: string;
  asub: string;
  icon: string;
  type: number;
  epoch: string;
  etime: any;
  hidden: string;
  sectype: any;
};

type EpnsNotifRawNotification = {
  body: string;
  title: string;
};
