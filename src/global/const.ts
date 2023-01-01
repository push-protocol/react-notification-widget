// because package.json is outside "src", this import changes the way the types are output to the dist folder
// if this import is removed, the "types" in package.json should be changed
import { mainnet, goerli } from 'wagmi';
import pkg from '../../package.json';

export const LOCALSTORAGE_PREFIX = 'wherever.';

// This variable is defined at build time by esbuild.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ENV = WHEREVER_ENV;

export const LOCALSTORAGE_THEME_MODE_KEY = `${LOCALSTORAGE_PREFIX}themeMode`;

export const WHEREVER_HOMEPAGE = 'https://wherever.to';
export const WHEREVER_FAQ = 'https://wherever.to/faq';

export const WIDGET_VERSION = pkg.version;

export const MAINNET_CHAINS = [mainnet];
export const TESTNET_CHAINS = [goerli];

export const CHAIN_NAMES: { [key: number]: string } = {
  1: 'Ethereum mainnet',
  5: 'Goerli test network',
};
