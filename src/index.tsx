import React from 'react';
import { ThemeProvider } from 'styled-components';
import { WagmiConfig } from 'wagmi';
import NotificationBell from './components/NotificationBell';
import theme from './theme';
import { NotificationsProvider } from 'context/NotificationsContext';
import { wagmiClient } from 'services/auth';
import './index.css';
import { RouterProvider } from 'context/RouterContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <NotificationsProvider>
          <RouterProvider>
            <div style={{ height: '100vh', width: '100vw' }}>
              <NotificationBell />
            </div>
          </RouterProvider>
        </NotificationsProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
