import { LOCALSTORAGE_PREFIX } from 'global/const';

const LOCALSTORAGE_AUTH_STORAGE_KEY = `${LOCALSTORAGE_PREFIX}auth`;
const LOCALSTORAGE_USER_TOKENS_KEY = `${LOCALSTORAGE_PREFIX}userTokens`;

type AuthStoreKeys = 'address' | 'token' | 'refreshToken';

class AuthStorage {
  setAuth(value: Record<AuthStoreKeys, string | undefined>): void {
    localStorage.setItem(LOCALSTORAGE_AUTH_STORAGE_KEY, JSON.stringify(value));
  }

  getAuth(): { [s in AuthStoreKeys]: string | undefined } {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_STORAGE_KEY) || '{}');
  }

  private addUserAccountToken(args: {
    token: string;
    refreshToken: string;
    address: string;
  }): void {
    const { address, token, refreshToken } = args;

    const updatedTokens = {
      ...this.getUserSavedTokens(),
      [address]: {
        token,
        refreshToken,
      },
    };

    localStorage.setItem(LOCALSTORAGE_USER_TOKENS_KEY, JSON.stringify(updatedTokens));
  }

  getUserSavedTokens(): Record<string, { token: string; refreshToken: string }> {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_TOKENS_KEY) || '{}');
  }

  saveAndSetTokensForAddress(args: { token: string; refreshToken: string; address: string }) {
    this.addUserAccountToken(args);
    this.setAuth(args);
  }

  switchActiveWalletTokens(walletAddress: string): boolean {
    const updatedTokens = this.getUserSavedTokens();

    if (updatedTokens[walletAddress]) {
      this.setAuth({
        address: walletAddress,
        token: updatedTokens[walletAddress].token,
        refreshToken: updatedTokens[walletAddress].refreshToken,
      });
      return true;
    }

    return false;
  }

  removeActiveAddressTokens() {
    const activeAuth = this.getAuth();

    if (activeAuth?.address) {
      const updatedTokens = {
        ...this.getUserSavedTokens(),
        [activeAuth.address]: undefined,
      };

      localStorage.setItem(LOCALSTORAGE_USER_TOKENS_KEY, JSON.stringify(updatedTokens));
    }

    this.setAuth({
      address: undefined,
      token: undefined,
      refreshToken: undefined,
    });
  }

  clearAllKeys = () => {
    this.removeActiveAddressTokens();
    localStorage.setItem(LOCALSTORAGE_USER_TOKENS_KEY, JSON.stringify({}));
  };
}

const authStorage = new AuthStorage();
export default authStorage;
