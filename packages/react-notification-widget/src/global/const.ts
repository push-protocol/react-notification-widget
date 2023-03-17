// because package.json is outside "src", this import changes the way the types are output to the dist folder
// if this import is removed, the "types" in package.json should be changed
import { mainnet, goerli, polygon, polygonMumbai } from 'wagmi/chains';
import pkg from '../../package.json';

export const LOCALSTORAGE_PREFIX = 'wherever.';

export const ENV = process.env.NODE_ENV;

export const LOCALSTORAGE_THEME_MODE_KEY = `${LOCALSTORAGE_PREFIX}themeMode`;

export const WHEREVER_HOMEPAGE = 'https://wherever.im';
export const WHEREVER_FAQ = 'https://wherever.im/faq';

export const WIDGET_VERSION = pkg.version;

export const MAINNET_CHAINS = [mainnet, polygon];
export const TESTNET_CHAINS = [goerli, polygonMumbai];

export const CHAIN_NAMES: { [key: number]: string } = {
  1: 'Ethereum mainnet',
  5: 'Goerli test network',
  [polygon.id]: polygon.name,
  [polygonMumbai.id]: polygonMumbai.name,
};
