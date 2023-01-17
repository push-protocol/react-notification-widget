import React, { PropsWithChildren, useEffect } from 'react';
import { WagmiConfig } from 'wagmi';
import { ThemeProvider } from 'styled-components';
import { providers } from 'ethers';
import { CustomTheme, makeTheme } from '../../theme';
import { AccountProvider, WhereverSigner } from '../../context/AccountContext';
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

export type NotificationFeedProviderProps = PropsWithChildren<{
  customSigner?: Required<WhereverSigner>;
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
