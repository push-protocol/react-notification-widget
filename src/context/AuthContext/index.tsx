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
import { useEnvironment } from 'context/EnvironmentContext';

export type AuthInfo = {
  subscribe(): void;
  unsubscribe(): void;
  isLoading: boolean;
  error: boolean;
  isLoggedIn: boolean;
  login(callback?: () => void): void;
  setIsFirstLogin(isFirst: boolean): void;
};

const isUserSubscribed = async (args: {
  userAddress: string;
  channelAddress: string;
  env: string;
  chainId: number;
}): Promise<boolean> => {
  const { userAddress, channelAddress, env, chainId } = args;
  const subbedChannels: { channel: string }[] = await epns.user.getSubscriptions({
    user: `eip155:${chainId}:${userAddress}`,
    env,
  });
  const subbedChannelsLower = subbedChannels.map((s) => s.channel.toLowerCase());
  return subbedChannelsLower.indexOf(channelAddress.toLowerCase()) !== -1;
};

const AuthContext = createContext<AuthInfo & { loading?: boolean; handleGetUserInfo?: () => void }>(
  {} as AuthInfo
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setRoute } = useRouterContext();
  const { channelAddress } = useChannelContext();
  const { epnsEnv, chainId } = useEnvironment();
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();
  const { login: _login } = useAuthenticate();
  const dc = useDisconnect();
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
          env: epnsEnv,
          chainId,
        })
      );
      setIsLoading(false);
    })();
  }, [channelAddress, address, isConnected, epnsEnv, chainId]);

  const login = async (callback?: () => void) => {
    if (isLoggedIn || !!localStorage.getItem(LOCALSTORAGE_AUTH_KEY)) {
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
      setRoute(Routes.WalletDisconnected);
      return;
    } else if (!isSubscribed) {
      setRoute(Routes.Subscribe);
      return;
    }

    if (!isFirstLogin) {
      setRoute(Routes.NotificationsFeed);
    }
  }, [isConnected, isSubscribed, isFirstLogin]);

  useEffect(() => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
    setIsFirstLogin(false);
    setIsLoggedIn(false);
  }, [address]);

  const toggleSubscription = async (action: 'sub' | 'unsub') => {
    setIsLoading(true);
    const params = {
      signer: signer as any,
      channelAddress: `eip155:${chainId}:${channelAddress}`,
      userAddress: `eip155:${chainId}:${address}`,
      env: epnsEnv,
    };

    const response =
      action == 'sub'
        ? await epns.channels.subscribe(params)
        : await epns.channels.unsubscribe(params);

    setIsLoading(false);

    if (response.status == 'success') {
      setIsSubscribed(action === 'sub');
    }
  };

  const subscribe = async () => toggleSubscription('sub');
  const unsubscribe = async () => toggleSubscription('unsub');

  return (
    <AuthContext.Provider
      value={{
        subscribe,
        unsubscribe,
        isLoggedIn: isLoggedIn || !!localStorage.getItem(LOCALSTORAGE_AUTH_KEY),
        isLoading,
        error,
        login,
        setIsFirstLogin,
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
