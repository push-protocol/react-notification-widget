import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import { ThemeProvider } from 'styled-components';
import { ethers, providers } from 'ethers';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CustomTheme, makeTheme } from 'theme';
import { Reset } from 'theme/ResetCss';
import { RouterProvider } from 'context/RouterContext';
import { NotificationsProvider } from 'context/NotificationsContext';
import { ChannelProvider } from 'context/ChannelContext';
import { ApolloProvider } from 'components/ApolloProvider';
import { EnvType, EnvironmentProvider } from 'context/EnvironmentContext';
import analytics from 'services/analytics';

export type NotificationFeedProviderProps = PropsWithChildren<{
  partnerKey: string;
  env?: EnvType;
  provider?: providers.BaseProvider | providers.ExternalProvider | providers.JsonRpcFetchFunc;
  theme?: CustomTheme;
  disableAnalytics?: boolean;
}>;

const NotificationFeedProvider = ({
  partnerKey,
  env = 'production',
  provider,
  theme,
  children,
  disableAnalytics,
}: NotificationFeedProviderProps) => {
  const wagmiClient = useMemo(() => {
    let wagmiProvider = ethers.getDefaultProvider();

    // runtime check to see if this is an ethers provider or not based on random property that exists on the BaseProvider type.
    if ((provider as providers.BaseProvider)?._network) {
      wagmiProvider = provider as providers.BaseProvider;
    } else if (provider) {
      // this is a standard EipProvider (web3js provider or similar)
      wagmiProvider = new providers.Web3Provider(provider as providers.ExternalProvider);
    }

    return createClient({
      autoConnect: true,
      provider: wagmiProvider,
      connectors: [
        new InjectedConnector({
          options: {
            shimDisconnect: false,
          },
        }),
        new MetaMaskConnector({
          options: {},
        }),
        new WalletConnectConnector({
          options: {
            qrcode: true,
          },
        }),
        new CoinbaseWalletConnector({
          options: { appName: 'wherever' },
        }),
      ],
    });
  }, [provider]);

  useEffect(() => {
    if (disableAnalytics) {
      analytics.disableAnalytics();
    }
  }, [disableAnalytics]);

  return (
    <EnvironmentProvider env={env}>
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
