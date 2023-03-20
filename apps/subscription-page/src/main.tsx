import { useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { WagmiConfig } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import LogRocket from 'logrocket';
import { chains, wagmiClient } from './services/auth';
import apolloClient from './services/apollo';
import { IS_PROD } from './global/consts';
import { theme } from './theme';
import Router from './Router';

const root = createRoot(document.getElementById('root') as HTMLElement);

if (IS_PROD) {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY!, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  });
  LogRocket.init('fn8k6v/prod-app-gqiry');
}

function ForceDarkMode(props: { children: JSX.Element }) {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') return;
    toggleColorMode();
  }, [colorMode, toggleColorMode]);

  return props.children;
}

root.render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={darkTheme({ borderRadius: 'large' })} chains={chains}>
          <ChakraProvider theme={theme}>
            <ForceDarkMode>
              <ApolloProvider client={apolloClient}>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </ApolloProvider>
            </ForceDarkMode>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </PostHogProvider>
  </StrictMode>
);
