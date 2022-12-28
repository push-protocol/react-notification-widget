import { LOCALSTORAGE_PREFIX } from 'global/const';

const LOCALSTORAGE_AUTH_STORAGE_KEY = `${LOCALSTORAGE_PREFIX}auth`;
const LOCALSTORAGE_USER_TOKENS_KEY = `${LOCALSTORAGE_PREFIX}userTokens`;

const AUTH_STORAGE_CURRENT_ACCOUNT = 'account';
const AUTH_STORAGE_AUTH_KEY = 'token';
const AUTH_STORAGE_AUTH_REFRESH_KEY = 'refreshToken';

class AuthStorage {
  private static setAuth(value: string): void {
    localStorage.setItem(LOCALSTORAGE_AUTH_STORAGE_KEY, JSON.stringify(value));
  }

  private static getAuth(): any {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_STORAGE_KEY) || '{}');
  }

  setAuthKey(value: string): void {
    const auth = AuthStorage.getAuth();
    auth[AUTH_STORAGE_AUTH_KEY] = value;
    AuthStorage.setAuth(auth);
  }

  setAuthRefreshKey(value: string): void {
    const auth = AuthStorage.getAuth();
    auth[AUTH_STORAGE_AUTH_REFRESH_KEY] = value;
    AuthStorage.setAuth(auth);
  }

  setCurrentAccount(value: string): void {
    const auth = AuthStorage.getAuth();
    auth[AUTH_STORAGE_CURRENT_ACCOUNT] = value;
    AuthStorage.setAuth(auth);
  }

  // Updates user token list and token/refreshToken
  updateAllTokens(authKey: string, authRefreshKey: string, currentAccount?: string) {
    const auth = AuthStorage.getAuth();
    const savedCurrentAccount = this.getCurrentAccount();

    // If currentAccount is not passed but account is still saved in the list
    const account = currentAccount || savedCurrentAccount;

    if (account) {
      this.setUserTokens(account, authKey, authRefreshKey);
      auth[AUTH_STORAGE_CURRENT_ACCOUNT] = account;
    }

    auth[AUTH_STORAGE_AUTH_KEY] = authKey;
    auth[AUTH_STORAGE_AUTH_REFRESH_KEY] = authRefreshKey;
    AuthStorage.setAuth(auth);
  }

  // Called when user changes account and sets token/refreshToken if it exists in the list
  refreshTokensOnWalletChange(walletAddress: string): boolean {
    const auth = AuthStorage.getAuth();
    const updatedTokens = this.getUserTokens();

    auth[AUTH_STORAGE_CURRENT_ACCOUNT] = walletAddress;

    if (updatedTokens[walletAddress]) {
      auth[AUTH_STORAGE_AUTH_KEY] = updatedTokens[walletAddress].authKey;
      auth[AUTH_STORAGE_AUTH_REFRESH_KEY] = updatedTokens[walletAddress].authRefreshKey;
      AuthStorage.setAuth(auth);
      return true;
    }

    this.removeAuthKeys();

    return false;
  }

  setUserTokens(walletAddress: string, authKey: string, authRefreshKey: string): void {
    const updatedTokens = this.getUserTokens();

    updatedTokens[walletAddress] = {
      authKey,
      authRefreshKey,
    };

    localStorage.setItem(LOCALSTORAGE_USER_TOKENS_KEY, JSON.stringify(updatedTokens));
  }

  getUserTokens(): any {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_TOKENS_KEY) || '{}');
  }

  getCurrentAccount(): string | null {
    const auth = AuthStorage.getAuth();
    return auth[AUTH_STORAGE_CURRENT_ACCOUNT];
  }

  getAuthKey(): string | null {
    const auth = AuthStorage.getAuth();
    return auth[AUTH_STORAGE_AUTH_KEY];
  }

  getAuthRefreshKey(): string | null {
    const auth = AuthStorage.getAuth();
    return auth[AUTH_STORAGE_AUTH_REFRESH_KEY];
  }

  removeAuthKeys() {
    const auth = AuthStorage.getAuth();
    auth[AUTH_STORAGE_AUTH_KEY] = null;
    auth[AUTH_STORAGE_AUTH_REFRESH_KEY] = null;
    AuthStorage.setAuth(auth);
  }
}

const authStorage = new AuthStorage();
export default authStorage;
