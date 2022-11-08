import React, { PropsWithChildren, useEffect } from 'react';
import { WagmiConfig } from 'wagmi';
import { ThemeProvider } from 'styled-components';
import { providers } from 'ethers';
import useWagmiClient from './useWagmiClient';
import { CustomTheme, makeTheme } from 'theme';
import { Reset } from 'theme/ResetCss';
import { RouterProvider } from 'context/RouterContext';
import { NotificationsProvider } from 'context/NotificationsContext';
import { ChannelProvider } from 'context/ChannelContext';
import { ApolloProvider } from 'components/ApolloProvider';
import { EnvType, EnvironmentProvider } from 'context/EnvironmentContext';
import analytics from 'services/analytics';

export type ExternalProvider =
  | providers.BaseProvider
  | providers.ExternalProvider
  | providers.JsonRpcFetchFunc;

export type NotificationFeedProviderProps = PropsWithChildren<{
  partnerKey: string;
  env?: EnvType;
  provider?: ExternalProvider;
  theme?: CustomTheme;
  disableAnalytics?: boolean;
}>;

const NotificationFeedProvider = ({
  partnerKey,
  provider,
  theme,
  children,
  disableAnalytics,
}: NotificationFeedProviderProps) => {
  const wagmiClient = useWagmiClient(provider);

  useEffect(() => {
    if (disableAnalytics) {
      analytics.disableAnalytics();
    }
  }, [disableAnalytics]);

  return (
    <EnvironmentProvider>
      <ThemeProvider theme={makeTheme(theme)}>
        <WagmiConfig client={wagmiClient}>
          <ApolloProvider>
            <ChannelProvider partnerKey={partnerKey}>
              <NotificationsProvider>
                <Reset />
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
