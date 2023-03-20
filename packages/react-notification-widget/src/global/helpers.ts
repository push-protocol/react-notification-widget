import { MAINNET_CHAINS } from './const';

export const isMainnnet = (chainId: number) =>
  MAINNET_CHAINS.map((chain) => chain.id).includes(chainId);
