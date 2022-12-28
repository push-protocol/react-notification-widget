import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as epns from '@epnsproject/sdk-restapi';
import { useAccount, useDisconnect, useSigner } from 'wagmi';
import { Routes, useRouterContext } from 'context/RouterContext';
import analytics from 'services/analytics';
import { useAuthenticate } from 'hooks/useAuthenticate';
import { useChannelContext } from 'context/ChannelContext';
import { usePrevious } from 'hooks/usePrevious';
import authStorage from 'services/authStorage';
import { useEnvironment } from 'context/EnvironmentContext';

export type AuthInfo = {
  subscribe(): void;
  unsubscribe(): void;
  isLoading: boolean;
  error: boolean;
  isLoggedIn?: boolean;
  loggedInAddress?: string;
  discordToken?: string;
  login(callback?: () => void): Promise<void>;
  isOnboarding: boolean;
  isSubscribed?: boolean;
  userDisconnected: boolean;
  setIsOnboarding(isFirst: boolean): void;
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

const AuthProvider = ({
  children,
  discordToken,
}: {
  children: ReactNode;
  discordToken?: string;
}) => {
  const { isSubscribeOnlyMode } = useEnvironment();
  const { setRoute } = useRouterContext();
  const { channelAddress, chainId } = useChannelContext();
  const { isConnected, address } = useAccount();
  const { data: signer, refetch: refetchSigner } = useSigner();
  const { login: _login } = useAuthenticate();
  const dc = useDisconnect();

  const [isSubscribed, setIsSubscribed] = useState<boolean>();
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [loggedInAddress, setLoggedInAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refetchCounter, setRefetchCounter] = useState(0);

  // handle signer null case when reloading window after clearing storage
  useEffect(() => {
    if (signer || refetchCounter > 10) return;

    const timeout = setInterval(async () => {
      refetchSigner();
      setRefetchCounter((counter) => counter + 1);
    }, 500);

    return () => clearInterval(timeout);
  }, [signer]);

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

    analytics.track('backend login started');
    setIsLoading(true);
    setError(false);

    try {
      const result = await _login(channelAddress);
      analytics.track('backend login successful');

      if (address) {
        authStorage.setToken(address, result.token, result.refreshToken);
      }

      setLoggedInAddress(address);
      setIsLoggedIn(true);

      callback && callback();
    } catch (e) {
      setError(true);
      _resetLoginState();
    } finally {
      setIsLoading(false);
    }
  };

  const _resetLoginState = () => {
    if (address && authStorage.refreshTokensOnWalletChange(address)) {
      setIsLoggedIn(true);
      setLoggedInAddress(address);
    } else {
      setIsLoggedIn(false);
      setLoggedInAddress('');
      setRoute(Routes.Subscribe);
    }
  };

  const logout = useCallback(() => {
    _resetLoginState();
    setIsSubscribed(false);
    setError(false);
    setIsLoading(false);
    dc.disconnect();
  }, [dc]);

  useEffect(() => {
    if (!isConnected) {
      logout();
    } else if (!isSubscribed) {
      setRoute(Routes.Subscribe);
    }
  }, [isConnected, isSubscribed]);

  const prevAddress = usePrevious(address);
  // usePrevious is needed to detect address change and remove AUTH_KEY from local storage
  // for cases when user switches accounts manually
  useEffect(() => {
    if (prevAddress && prevAddress !== address) {
      _resetLoginState();
      setIsOnboarding(false);
    }
  }, [address]);

  // Set correct auth key on load
  useEffect(() => {
    const tokensList = authStorage.getTokens();

    if (address && tokensList[address]) {
      authStorage.setAuthKey(tokensList[address].authKey);
      authStorage.setAuthRefreshKey(tokensList[address].authRefreshKey);
      setRoute(isSubscribeOnlyMode ? Routes.Settings : Routes.NotificationsFeed);
      setIsLoggedIn(true);
      setLoggedInAddress(address);
    }
  }, [address]);

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
      throw 'error subscribing to channel';
    }
  };

  const subscribe = async () => toggleSubscription('sub');
  const unsubscribe = async () => toggleSubscription('unsub');

  return (
    <AuthContext.Provider
      value={{
        subscribe,
        isSubscribed,
        unsubscribe,
        isLoggedIn,
        loggedInAddress,
        isLoading,
        error,
        login,
        isOnboarding,
        setIsOnboarding,
        userDisconnected: !isConnected,
        discordToken,
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
