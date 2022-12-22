import React, { PropsWithChildren, useEffect } from 'react';
import { WagmiConfig } from 'wagmi';
import { ThemeProvider } from 'styled-components';
import { providers } from 'ethers';
import { CustomTheme, makeTheme } from '../../theme';
import useWagmiClient from './useWagmiClient';
import { UserProvider } from 'context/UserContext';
import { Reset } from 'theme/ResetCss';
import { RouterProvider } from 'context/RouterContext';
import { ChannelProvider } from 'context/ChannelContext';
import { ApolloProvider } from 'components/ApolloProvider';
import { EnvironmentProvider, WidgetMode } from 'context/EnvironmentContext';
import analytics from 'services/analytics';
import { AuthProvider } from 'context/AuthContext';

export type ExternalProvider =
  | providers.BaseProvider
  | providers.ExternalProvider
  | providers.JsonRpcFetchFunc;

export type RpcUrls = { ethereum: string };

export type NotificationFeedProviderProps = PropsWithChildren<{
  partnerKey: string;
  discordToken?: string;
  provider?: ExternalProvider;
  theme?: CustomTheme;
  disableAnalytics?: boolean;
  mode?: WidgetMode;
}>;

const NotificationFeedProvider = ({
  partnerKey,
  discordToken,
  provider,
  theme,
  children,
  disableAnalytics,
  mode,
}: NotificationFeedProviderProps) => {
  const wagmiClient = useWagmiClient(provider);

  useEffect(() => {
    if (!disableAnalytics) {
      analytics.initialize();
    }
  }, [disableAnalytics]);

  return (
    <EnvironmentProvider mode={mode}>
      <ThemeProvider theme={makeTheme(theme)}>
        <WagmiConfig client={wagmiClient}>
          <ApolloProvider>
            <RouterProvider>
              <ChannelProvider partnerKey={partnerKey}>
                <AuthProvider discordToken={discordToken}>
                  <UserProvider>
                    <Reset />
                    {children}
                  </UserProvider>
                </AuthProvider>
              </ChannelProvider>
            </RouterProvider>
          </ApolloProvider>
        </WagmiConfig>
      </ThemeProvider>
    </EnvironmentProvider>
  );
};

export default NotificationFeedProvider;
