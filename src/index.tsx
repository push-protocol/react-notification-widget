import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { WagmiConfig } from 'wagmi';
import NotificationBell from './components/NotificationBell';
import theme from './theme';
import { NotificationsProvider } from 'context/NotificationsContext';
import { wagmiClient } from 'services/auth';
import './index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <NotificationsProvider>
          <div style={{ height: '100vh', width: '100vw' }}>
            <NotificationBell />
          </div>
        </NotificationsProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
