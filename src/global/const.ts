import pkg from '../../package.json';

export const LOCALSTORAGE_AUTH_KEY = 'whereverAuthToken';
export const LOCALSTORAGE_AUTH_REFRESH_KEY = 'whereverAuthRefreshToken';
export const FAQ_URL = 'https://faq.wherever.to';

export const WIDGET_VERSION = pkg.version;

export const CHAIN_NAMES: { [key: number]: string } = {
  1: 'Ethereum mainnet',
  5: 'Goerli test network',
};
