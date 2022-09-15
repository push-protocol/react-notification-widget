import { chain, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

configureChains([chain.mainnet], [publicProvider()]);
