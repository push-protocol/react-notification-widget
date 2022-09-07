import React, { useEffect, useState, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { WagmiConfig } from 'wagmi';
import { ApolloProvider } from '@apollo/client';
import theme from './theme';
import { NotificationsProvider } from 'context/NotificationsContext';
import { wagmiClient } from 'services/auth';
import './index.css';
import { RouterProvider } from 'context/RouterContext';
import Widget from 'components/Widget';
import { ChannelProvider, EpnsChannelInfo } from 'context/ChannelContext';
import { getTempChannelInfo } from 'graphql/EpnsChannelInfo/temp';
import { apolloClient } from 'services/apolloClient';

type AppProps = {
  partnerKey: string;
  NotificationButton?: ReactElement;
};

function App({ partnerKey }: AppProps) {
  const [channel, setChannel] = useState<EpnsChannelInfo>();

  useEffect(() => {
    getTempChannelInfo(partnerKey).then((result) => setChannel(result));
  }, [partnerKey]);

  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <ChannelProvider channel={channel}>
          <NotificationsProvider>
            <RouterProvider>
              <ApolloProvider client={apolloClient}>
                <div style={{ height: '100vh', width: '100vw' }}>
                  <Widget />
                </div>
              </ApolloProvider>
            </RouterProvider>
          </NotificationsProvider>
        </ChannelProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
