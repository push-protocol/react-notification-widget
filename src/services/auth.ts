import { chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet],
    [alchemyProvider({ }), publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

export { wagmiClient, chains };
