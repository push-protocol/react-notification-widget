// because package.json is outside "src", this import changes the way the types are output to the dist folder
// if this import is removed, the "types" in package.json should be changed
import pkg from '../../package.json';

export const LOCALSTORAGE_AUTH_KEY = 'whereverAuthToken';
export const LOCALSTORAGE_AUTH_REFRESH_KEY = 'whereverAuthRefreshToken';
export const LOCALSTORAGE_THEME_MODE_KEY = 'whereverThemeMode';

export const WHEREVER_HOMEPAGE = 'https://wherever.to';

export const WIDGET_VERSION = pkg.version;

export const CHAIN_NAMES: { [key: number]: string } = {
  1: 'Ethereum mainnet',
  5: 'Goerli test network',
};
