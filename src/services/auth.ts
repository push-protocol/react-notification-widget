import { chain, configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains([chain.mainnet], [publicProvider()]);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

export { wagmiClient, chains };
