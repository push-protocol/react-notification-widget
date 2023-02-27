import { providers } from 'ethers';
import { createClient, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ExternalProvider } from './index';
import { ALCHEMY_KEY, MAINNET_CHAINS, TESTNET_CHAINS } from 'global/const';

export default function useWagmiClient(provider?: ExternalProvider) {
  let wagmiProvider: providers.BaseProvider = new providers.AlchemyProvider(undefined, ALCHEMY_KEY);

  // runtime check to see if this is an ethers provider or not based on random property that exists on the BaseProvider type.
  if ((provider as providers.BaseProvider)?._isProvider) {
    wagmiProvider = provider as providers.BaseProvider;
  } else if (provider) {
    // this is a standard EipProvider (web3js provider or similar)
    wagmiProvider = new providers.Web3Provider(provider as providers.ExternalProvider);
  }

  const { chains } = configureChains(
    [...MAINNET_CHAINS, ...TESTNET_CHAINS],
    // setup a provider so that wagmi only tries to use alchemy
    [alchemyProvider({ apiKey: ALCHEMY_KEY })]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Wherever Widget',
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    provider: wagmiProvider,
    connectors,
  });

  return {
    wagmiClient,
    chains,
  };
}
