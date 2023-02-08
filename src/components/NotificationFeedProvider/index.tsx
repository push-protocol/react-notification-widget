import React, { PropsWithChildren, useEffect } from 'react';
import { WagmiConfig } from 'wagmi';
import { ThemeProvider } from 'styled-components';
import { providers } from 'ethers';
import analytics from '../../services/analytics';
import { ApolloProvider } from '../ApolloProvider';
import { Reset } from '../../theme/ResetCss';
import { CustomTheme, makeTheme } from '../../theme';
import useWagmiClient from './useWagmiClient';
import { EnvironmentProvider, WidgetMode } from 'context/EnvironmentContext';
import { AuthProvider } from 'context/AuthContext';
import { RouterProvider } from 'context/RouterContext';
import { ChannelProvider } from 'context/ChannelContext';
import { UserProvider } from 'context/UserContext';
import { AccountProvider, CustomSigner } from 'context/AccountContext';

export type ExternalProvider =
  | providers.BaseProvider
  | providers.ExternalProvider
  | providers.JsonRpcFetchFunc;

export type NotificationFeedProviderProps = PropsWithChildren<{
  customSigner?: Required<CustomSigner>;
  partnerKey: string;
  discordToken?: string;
  provider?: ExternalProvider;
  theme?: CustomTheme;
  disableAnalytics?: boolean;
  mode?: WidgetMode;
  isOpen?: boolean;
}>;

const NotificationFeedProvider = ({
  partnerKey,
  discordToken,
  provider,
  theme,
  children,
  disableAnalytics,
  isOpen,
  mode = WidgetMode.Default,
  customSigner,
}: NotificationFeedProviderProps) => {
  const wagmiClient = useWagmiClient(provider);

  if (mode === WidgetMode.Default && !customSigner && !provider) {
    console.error('Wherever: at least 1 of "provider" or "customSigner" props must be provided');
  }

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
                <AccountProvider {...customSigner}>
                  <AuthProvider partnerKey={partnerKey} discordToken={discordToken}>
                    <UserProvider isOpen={isOpen}>
                      <Reset />
                      {children}
                    </UserProvider>
                  </AuthProvider>
                </AccountProvider>
              </ChannelProvider>
            </RouterProvider>
          </ApolloProvider>
        </WagmiConfig>
      </ThemeProvider>
    </EnvironmentProvider>
  );
};

export default NotificationFeedProvider;
