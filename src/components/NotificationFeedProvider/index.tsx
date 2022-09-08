import React, { PropsWithChildren } from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import { ThemeProvider } from 'styled-components';
import { CustomTheme, makeTheme } from '../../theme';
import { RouterProvider } from 'context/RouterContext';
import { NotificationsProvider } from 'context/NotificationsContext';
import { ChannelProvider } from 'context/ChannelContext';
import { ApolloProvider } from 'context/ApolloProvider';
import { EnvType, EnvironmentProvider } from 'context/EnvironmentContext';

export type NotificationFeedProviderProps = PropsWithChildren<{
  partnerKey: string;
  env?: EnvType;
  provider: any;
  theme?: CustomTheme;
}>;

const NotificationFeedProvider = ({
  partnerKey,
  env = 'production',
  provider,
  theme,
  children,
}: NotificationFeedProviderProps) => {
  const wagmiClient = createClient({
    autoConnect: true,
    provider,
  });

  return (
    <EnvironmentProvider env={env}>
      <ThemeProvider theme={makeTheme(theme)}>
        <WagmiConfig client={wagmiClient}>
          <ApolloProvider>
            <ChannelProvider partnerKey={partnerKey}>
              <NotificationsProvider>
                <RouterProvider>{children}</RouterProvider>
              </NotificationsProvider>
            </ChannelProvider>
          </ApolloProvider>
        </WagmiConfig>
      </ThemeProvider>
    </EnvironmentProvider>
  );
};

export default NotificationFeedProvider;
