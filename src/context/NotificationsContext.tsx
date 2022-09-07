import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

import { useAccount } from 'wagmi';
import * as epns from '@epnsproject/sdk-restapi';
import { useEnvironment } from './EnvironmentContext';

export type EpnsNotification = {
  title: string;
  message: string;
  app: string;
  icon?: string;
  url?: string;
  cta?: string;
};

type NotificationsContext = {
  notifications: EpnsNotification[];
  isLoggedIn: boolean;
  isLoading: boolean;
  userAddress?: string;
  isChannelOwner: boolean;
};

const NotificationsContext = createContext<NotificationsContext>({
  isLoggedIn: false,
  isLoading: false,
  notifications: [],
  isChannelOwner: false,
} as NotificationsContext);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected: isLoggedIn, address: userAddress } = useAccount();
  const [isChannelOwner, setIsChannelOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<EpnsNotification[]>([]);
  const { chainId, epnsEnv } = useEnvironment();

  useEffect(() => {
    if (userAddress) {
      setIsLoading(true);
      epns.user
        .getFeeds({
          user: `eip155:${chainId}:${userAddress}`,
          env: epnsEnv,
          page: 1,
          limit: 1000,
        })
        .then((result) => {
          console.log(result);
          const notifs = result?.map((item: any) => ({
            title: item.notification.title,
            message: item.message,
            app: item.app,
            icon: item.icon,
            url: item.url,
            cta: item.cta,
          }));
          setNotifications(notifs || []);
          setIsLoading(false);
        });
    }
  }, [isLoggedIn, userAddress]);

  return (
    <NotificationsContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        notifications,
        userAddress,
        isChannelOwner,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotificationsContext() {
  return useContext(NotificationsContext);
}
