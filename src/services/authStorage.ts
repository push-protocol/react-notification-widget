import {
  LOCALSTORAGE_AUTH_KEY,
  LOCALSTORAGE_AUTH_REFRESH_KEY,
  LOCALSTORAGE_CURRENT_WALLET_ADDRESS,
  LOCALSTORAGE_WALLET_TOKENS,
} from 'global/const';

class AuthStorage {
  setAuthKey(value: string): void {
    localStorage.setItem(LOCALSTORAGE_AUTH_KEY, value);
  }

  setAuthRefreshKey(value: string): void {
    localStorage.setItem(LOCALSTORAGE_AUTH_REFRESH_KEY, value);
  }

  setCurrentWalletAddress(address: string) {
    localStorage.setItem(LOCALSTORAGE_CURRENT_WALLET_ADDRESS, address);
  }

  updateTokens(authKey: string, authRefreshKey: string) {
    const updatedTokens = this.getTokens();
    const currentUser = this.getCurrentWalletAddress();

    if (currentUser && updatedTokens[currentUser]) {
      updatedTokens[currentUser] = {
        authKey,
        authRefreshKey,
      };
    }

    this.setAuthKey(authKey);
    this.setAuthRefreshKey(authRefreshKey);
  }

  refreshTokensOnWalletChange(walletAddress: string): boolean {
    const updatedTokens = this.getTokens();

    if (updatedTokens[walletAddress]) {
      this.removeAuthKeys();
      this.setCurrentWalletAddress(walletAddress);
      this.setAuthKey(updatedTokens[walletAddress].authKey);
      this.setAuthRefreshKey(updatedTokens[walletAddress].authRefreshKey);
      return true;
    }

    return false;
  }

  setToken(walletAddress: string, authKey: string, authRefreshKey: string): void {
    const updatedTokens = this.getTokens();

    if (this.refreshTokensOnWalletChange(walletAddress)) return;

    updatedTokens[walletAddress] = {
      authKey,
      authRefreshKey,
    };
    this.setCurrentWalletAddress(walletAddress);
    this.setAuthKey(authKey);
    this.setAuthRefreshKey(authRefreshKey);

    localStorage.setItem(LOCALSTORAGE_WALLET_TOKENS, JSON.stringify(updatedTokens));
  }

  getTokens() {
    const tokens = localStorage.getItem(LOCALSTORAGE_WALLET_TOKENS);
    return tokens ? JSON.parse(tokens) : {};
  }

  getCurrentWalletAddress(): string | null {
    return localStorage.getItem(LOCALSTORAGE_CURRENT_WALLET_ADDRESS);
  }

  getAuthKey(): string | null {
    return localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  }

  getAuthRefreshKey(): string | null {
    return localStorage.getItem(LOCALSTORAGE_AUTH_REFRESH_KEY);
  }

  removeAuthKeys() {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
    localStorage.removeItem(LOCALSTORAGE_AUTH_REFRESH_KEY);
  }
}

const authStorage = new AuthStorage();
export default authStorage;
