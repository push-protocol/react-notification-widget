import React from 'react';
import { ThemeProvider } from 'styled-components';
import { WagmiConfig } from 'wagmi';
import theme from './theme';
import { NotificationsProvider } from 'context/NotificationsContext';
import { wagmiClient } from 'services/auth';
import './index.css';
import { RouterProvider } from 'context/RouterContext';
import Widget from 'components/Widget';
import { ChannelProvider, EpnsChannelInfo } from 'context/ChannelContext';

type AppProps = {
  channel: EpnsChannelInfo;
};

function App({ channel }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <ChannelProvider channel={channel}>
          <NotificationsProvider>
            <RouterProvider>
              <div style={{ height: '100vh', width: '100vw' }}>
                <Widget />
              </div>
            </RouterProvider>
          </NotificationsProvider>
        </ChannelProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
