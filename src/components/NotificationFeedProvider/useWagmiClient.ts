import { useMemo } from 'react';
import { providers } from 'ethers';
import { createClient, configureChains, chain } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { ExternalProvider } from './index';

const ALCHEMY_KEY = 'OAFEClC2JW9MaAAd0F-93QJNx2EoVQSV';

export default function useWagmiClient(provider?: ExternalProvider) {
  return useMemo(() => {
    let wagmiProvider: providers.BaseProvider = new providers.AlchemyProvider(
      undefined,
      ALCHEMY_KEY
    );

    // runtime check to see if this is an ethers provider or not based on random property that exists on the BaseProvider type.
    if ((provider as providers.BaseProvider)?._isProvider) {
      wagmiProvider = provider as providers.BaseProvider;
    } else if (provider) {
      // this is a standard EipProvider (web3js provider or similar)
      wagmiProvider = new providers.Web3Provider(provider as providers.ExternalProvider);
    }

    const { chains } = configureChains(
      [chain.goerli, chain.mainnet, chain.polygon, chain.arbitrum],
      // setup a provider so that wagmi only tries to use alchemy
      [alchemyProvider({ apiKey: ALCHEMY_KEY })]
    );

    return createClient({
      autoConnect: true,
      provider: wagmiProvider,
      connectors: [
        new WalletConnectConnector({
          chains,
          options: {
            qrcode: true,
          },
        }),
        new MetaMaskConnector({
          options: {},
          chains,
        }),
        new CoinbaseWalletConnector({
          options: { appName: 'Wherever Widget' },
        }),
        new InjectedConnector({
          chains,
          options: {
            shimDisconnect: false,
            shimChainChangedDisconnect: false,
          },
        }),
      ],
    });
  }, [provider]);
}
