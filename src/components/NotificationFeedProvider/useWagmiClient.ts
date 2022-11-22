import { useMemo } from 'react';
import { ethers, providers } from 'ethers';
import { createClient } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { ExternalProvider, RpcUrls } from './index';

export default function useWagmiClient(provider?: ExternalProvider, rpcUrls?: RpcUrls) {
  return useMemo(() => {
    let wagmiProvider = ethers.getDefaultProvider();

    // runtime check to see if this is an ethers provider or not based on random property that exists on the BaseProvider type.
    if ((provider as providers.BaseProvider)?._isProvider) {
      wagmiProvider = provider as providers.BaseProvider;
    } else if (provider) {
      // this is a standard EipProvider (web3js provider or similar)
      wagmiProvider = new providers.Web3Provider(provider as providers.ExternalProvider);
    }

    if (rpcUrls)
      wagmiProvider = new providers.JsonRpcProvider({
        url: rpcUrls.ethereum,
      });

    return createClient({
      autoConnect: true,
      provider: wagmiProvider,
      connectors: [
        new WalletConnectConnector({
          options: {
            qrcode: true,
          },
        }),
        new MetaMaskConnector({
          options: {},
        }),
        new CoinbaseWalletConnector({
          options: { appName: 'Wherever Widget' },
        }),
        new InjectedConnector({
          options: {
            shimDisconnect: false,
            shimChainChangedDisconnect: false,
          },
        }),
      ],
    });
  }, [provider]);
}
