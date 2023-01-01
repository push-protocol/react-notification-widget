import { LOCALSTORAGE_PREFIX } from 'global/const';

const LOCALSTORAGE_AUTH_STORAGE_KEY = `${LOCALSTORAGE_PREFIX}auth`;
const LOCALSTORAGE_USER_TOKENS_KEY = `${LOCALSTORAGE_PREFIX}userTokens`;

type AuthStoreKeys = 'account' | 'token' | 'refreshToken';

class AuthStorage {
  setAuth(value: Record<AuthStoreKeys, string | null>): void {
    localStorage.setItem(LOCALSTORAGE_AUTH_STORAGE_KEY, JSON.stringify(value));
  }

  getAuth(): { [s in AuthStoreKeys]: string | null } {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_STORAGE_KEY) || '{}');
  }

  setUserTokens(walletAddress: string, token: string, refreshToken: string): void {
    const updatedTokens = this.getUserTokens();

    updatedTokens[walletAddress] = {
      token,
      refreshToken,
    };

    localStorage.setItem(LOCALSTORAGE_USER_TOKENS_KEY, JSON.stringify(updatedTokens));
  }

  getUserTokens(): { [s: string]: { token: string; refreshToken: string } } {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_TOKENS_KEY) || '{}');
  }

  updateUserTokens(token: string, refreshToken: string, currentAccount?: string) {
    // If currentAccount is not passed but account is still saved in the list
    const account = currentAccount || this.getAuth()?.account;

    if (account) {
      this.setUserTokens(account, token, refreshToken);
    }

    this.setAuth({
      account,
      token,
      refreshToken,
    });
  }

  switchActiveTokens(walletAddress: string): boolean {
    const updatedTokens = this.getUserTokens();

    if (updatedTokens[walletAddress]) {
      this.setAuth({
        account: walletAddress,
        token: updatedTokens[walletAddress].token,
        refreshToken: updatedTokens[walletAddress].refreshToken,
      });
      return true;
    }

    this.resetActiveKeys();

    return false;
  }

  resetActiveKeys() {
    this.setAuth({
      account: null,
      token: null,
      refreshToken: null,
    });
  }
}

const authStorage = new AuthStorage();
export default authStorage;
