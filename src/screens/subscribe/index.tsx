import React from 'react';
import { useTheme } from 'styled-components';
import { useNetwork } from 'wagmi';
import Spinner from '../../components/Spinner';
import analytics from '../../services/analytics';
import { useChannelContext } from 'context/ChannelContext';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';
import NewTag from 'components/NewTag';
import SubscribeDescription from 'screens/subscribe/components/SubscribeDescription';
import SubscribeInfo from 'screens/subscribe/components/SubscribeInfo';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import { CHAIN_NAMES } from 'global/const';

export const Subscribe = () => {
  const { isLoading, subscribe, setIsFirstLogin } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { loading, channelAddress, chainId, error } = useChannelContext();
  const { chain: walletChain } = useNetwork();
  const isWrongNetwork = !!chainId && chainId !== walletChain?.id;

  const theme = useTheme();

  const handleSubscribe = async () => {
    analytics.track('channel subscribe', { channelAddress });
    setIsFirstLogin(true);
    await subscribe();
    setRoute(Routes.ConnectEmail);
  };

  if (loading) {
    return (
      <Screen>
        <Flex alignItems={'center'} height={200}>
          <Spinner size={25} />
        </Flex>
      </Screen>
    );
  }

  return (
    <Screen>
      <Flex alignItems={'center'} direction={'column'} mb={4}>
        <Flex mb={1}>
          <NewTag />
        </Flex>
        <Text size={'xl'} weight={700} align={'center'}>
          Wallet-to-wallet notifications
        </Text>
      </Flex>
      <Flex alignItems={'center'} direction={'column'} mb={3} mt={2}>
        <SubscribeInfo />
        <SubscribeDescription />
      </Flex>
      <Flex width={'100%'} alignItems={'center'} direction={'column'} gap={1}>
        <Button
          variant={isLoading ? 'gray' : 'primary'}
          width={'100%'}
          p={1.5}
          onClick={handleSubscribe}
          disabled={isLoading || isWrongNetwork || !!error}
        >
          Subscribe
        </Button>
        {isWrongNetwork && (
          <Text color={theme.colors.error.main} align="center">
            Wrong network, please switch to {CHAIN_NAMES[chainId]} in your wallet to make changes
          </Text>
        )}
        {(error || !channelAddress) && (
          <Text color={theme.colors.error.main} align="center">
            Invalid partner key
          </Text>
        )}
        <Text size={'sm'} mt={1} mb={2} color={'secondary'} opacity={0.8} align={'center'}>
          You will need to sign a message to prove ownership of your wallet.
        </Text>
      </Flex>
    </Screen>
  );
};
