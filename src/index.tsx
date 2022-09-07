import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { WagmiConfig } from 'wagmi';
import theme from './theme';
import { NotificationsProvider } from 'context/NotificationsContext';
import { wagmiClient } from 'services/auth';
import './index.css';
import { RouterProvider } from 'context/RouterContext';
import Widget from 'components/Widget';
import { ChannelProvider } from 'context/ChannelContext';
import { EnvironmentProvider, EnvType } from 'context/EnvironmentContext';
import { ApolloProvider } from 'context/ApolloProvider';

type AppProps = {
  partnerKey: string;
  env?: EnvType;
};

function App({ partnerKey, env }: AppProps) {
  return (
    <EnvironmentProvider env={env}>
      <ThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <ApolloProvider>
            <ChannelProvider partnerKey={partnerKey}>
              <NotificationsProvider>
                <RouterProvider>
                  <div style={{ height: '100vh', width: '100vw' }}>
                    <Widget />
                  </div>
                </RouterProvider>
              </NotificationsProvider>
            </ChannelProvider>
          </ApolloProvider>
        </WagmiConfig>
      </ThemeProvider>
    </EnvironmentProvider>
  );
}

export default App;
