// because package.json is outside "src", this import changes the way the types are output to the dist folder
// if this import is removed, the "types" in package.json should be changed
import { chain } from 'wagmi';
import pkg from '../../package.json';

export const LOCALSTORAGE_PREFIX = 'wherever.';

export const LOCALSTORAGE_THEME_MODE_KEY = `${LOCALSTORAGE_PREFIX}themeMode`;

export const WHEREVER_HOMEPAGE = 'https://wherever.to';
export const WHEREVER_FAQ = 'https://wherever.to/faq';

export const WIDGET_VERSION = pkg.version;

export const MAINNET_CHAINS = [chain.mainnet, chain.polygon];
export const TESTNET_CHAINS = [chain.goerli, chain.polygonMumbai];

export const CHAIN_NAMES: { [key: number]: string } = {
  1: 'Ethereum mainnet',
  5: 'Goerli test network',
};
