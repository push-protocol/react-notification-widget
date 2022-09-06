import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

import { useAccount } from 'wagmi';
import { api } from '@epnsproject/frontend-sdk-staging';

export type EpnsNotification = {
  title: string;
  timestamp: string;
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

  useEffect(() => {
    if (userAddress) {
      setIsLoading(true);
      api.fetchNotifications(userAddress, 1000, 1).then(async (notificationsRaw: any) => {
        const notifs = notificationsRaw.results?.map(({ epoch, payload: { data } }: any) => ({
          timestamp: epoch,
          title: data.asub,
          message: data.amsg,
          app: data.app,
          icon: data.icon,
          url: data.url,
          cta: data.acta,
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
