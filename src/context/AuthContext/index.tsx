import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import * as epns from '@epnsproject/sdk-restapi';
import { useAccount, useDisconnect, useSigner } from 'wagmi';
import { Routes, useRouterContext } from 'context/RouterContext';
import analytics from 'services/analytics';
import { LOCALSTORAGE_AUTH_KEY, LOCALSTORAGE_AUTH_REFRESH_KEY } from 'global/const';
import { useAuthenticate } from 'hooks/auth/useAuthenticate';
import { useChannelContext } from 'context/ChannelContext';
import { usePrevious } from 'hooks/usePrevious';

export type AuthInfo = {
  subscribe(): void;
  unsubscribe(): void;
  isLoading: boolean;
  error: boolean;
  isLoggedIn: boolean;
  login(callback?: () => void): void;
  isFirstLogin: boolean;
  userDisconnected: boolean;
  setIsFirstLogin(isFirst: boolean): void;
};

const isUserSubscribed = async (args: {
  userAddress: string;
  channelAddress: string;
  chainId: number;
}): Promise<boolean> => {
  const { userAddress, channelAddress, chainId } = args;
  const subbedChannels: { channel: string }[] = await epns.user.getSubscriptions({
    user: `eip155:${chainId}:${userAddress}`,
    env: chainId === 1 ? undefined : 'staging',
  });
  const subbedChannelsLower = subbedChannels.map((s) => s.channel.toLowerCase());
  return subbedChannelsLower.indexOf(channelAddress.toLowerCase()) !== -1;
};

const AuthContext = createContext<AuthInfo & { loading?: boolean; handleGetUserInfo?: () => void }>(
  {} as AuthInfo
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setRoute } = useRouterContext();
  const { channelAddress, chainId } = useChannelContext();
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();
  const { login: _login } = useAuthenticate();
  const dc = useDisconnect();
  const [userDisconnected, setUserDisconnected] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isConnected || !channelAddress) {
      return;
    }

    (async () => {
      setIsLoading(true);
      setIsSubscribed(
        await isUserSubscribed({
          userAddress: address as string,
          channelAddress,
          chainId,
        })
      );
      setIsLoading(false);
    })();
  }, [channelAddress, address, isConnected, chainId]);

  const login = async (callback?: () => void) => {
    if (isLoggedIn) {
      callback && callback();
      return;
    }

    setIsLoading(true);
    analytics.track('login');
    setError(false);

    try {
      const result = await _login(channelAddress);
      localStorage.setItem(LOCALSTORAGE_AUTH_KEY, result.token);
      localStorage.setItem(LOCALSTORAGE_AUTH_REFRESH_KEY, result.refreshToken);
      setIsLoggedIn(true);
      callback && callback();
    } catch (e) {
      setError(true);
      localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
      localStorage.removeItem(LOCALSTORAGE_AUTH_REFRESH_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
    localStorage.removeItem(LOCALSTORAGE_AUTH_REFRESH_KEY);
    setIsSubscribed(false);
    setError(false);
    setIsLoading(false);
    dc.disconnect();
  }, [dc]);

  useEffect(() => {
    if (!isConnected) {
      logout();
      setUserDisconnected(true);
      return;
    } else if (!isSubscribed) {
      setRoute(Routes.Subscribe);
      setUserDisconnected(false);
      return;
    }

    if (!isFirstLogin) {
      setRoute(Routes.NotificationsFeed);
      setUserDisconnected(false);
    }
  }, [isConnected, isSubscribed, isFirstLogin]);

  const prevAddress = usePrevious(address);
  // usePrevious is needed to detect address change and remove AUTH_KEY from local storage
  // for cases when address is present but is different from previous address
  useEffect(() => {
    if (prevAddress && prevAddress !== address) {
      localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
      setIsFirstLogin(false);
      setIsLoggedIn(false);
    }
  }, [address]);

  useEffect(() => {
    if (localStorage.getItem(LOCALSTORAGE_AUTH_KEY)) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleSubscription = async (action: 'sub' | 'unsub') => {
    setIsLoading(true);
    const params = {
      signer: signer as any,
      channelAddress: `eip155:${chainId}:${channelAddress}`,
      userAddress: `eip155:${chainId}:${address}`,
      env: chainId === 1 ? undefined : 'staging',
    };

    const response =
      action == 'sub'
        ? await epns.channels.subscribe(params)
        : await epns.channels.unsubscribe(params);

    setIsLoading(false);

    if (response.status == 'success') {
      setIsSubscribed(action === 'sub');
    } else {
      throw 'error';
    }
  };

  const subscribe = async () => toggleSubscription('sub');
  const unsubscribe = async () => toggleSubscription('unsub');

  return (
    <AuthContext.Provider
      value={{
        subscribe,
        unsubscribe,
        isLoggedIn,
        isLoading,
        error,
        login,
        isFirstLogin,
        setIsFirstLogin,
        userDisconnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
