import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

import { useAccount } from 'wagmi';
import * as epns from '@epnsproject/sdk-restapi';
import { useEnvironment } from './EnvironmentContext';

export type EpnsNotification = {
  title: string;
  timestamp: string;
  message: string;
  app: string;
  image?: string;
  icon?: string;
  url?: string;
  cta?: string;
};

type NotificationsContext = {
  notifications: EpnsNotification[];
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
          const notifs = result?.map((item: any) => ({
            title: item.notification.title,
            message: item.message,
            app: item.app,
            icon: item.icon,
            url: item.url,
            image: item.image,
            cta: item.cta,
            timestamp: new Date().toISOString(),
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
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotificationsContext() {
  return useContext(NotificationsContext);
}
