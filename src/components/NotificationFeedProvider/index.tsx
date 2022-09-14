import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import { ThemeProvider } from 'styled-components';
import WebFont from 'webfontloader';
import { CustomTheme, makeTheme } from '../../theme';
import { Reset } from '../../theme/ResetCss';
import { RouterProvider } from 'context/RouterContext';
import { NotificationsProvider } from 'context/NotificationsContext';
import { ChannelProvider } from 'context/ChannelContext';
import { ApolloProvider } from 'components/ApolloProvider';
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
  useEffect(() => {
    WebFont.load({ google: { families: ['Inter', "'Noto+Serif+Georgian'"] } });
  }, []);

  const wagmiClient = useMemo(() => {
    return createClient({
      autoConnect: true,
      provider,
    });
  }, [provider]);

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
