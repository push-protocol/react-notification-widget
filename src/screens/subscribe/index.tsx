import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import Spinner from '../../components/Spinner';
import { useRouterContext, Routes } from '../../context/RouterContext';
import analytics from '../../services/analytics';
import Button from '../../components/Button';
import { useChannelContext } from 'context/ChannelContext';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import SubscribeDescription from 'screens/subscribe/components/SubscribeDescription';
import SubscribeInfo from 'screens/subscribe/components/SubscribeInfo';
import SubscribeHeader from 'screens/subscribe/components/SubscribeHeader';
import WrongNetworkError from 'components/Errors/WrongNetworkError';
import ConnectWalletButtons from 'screens/subscribe/components/ConnectWalletButtons';
import { useAuthContext } from 'context/AuthContext';

const Container = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  [`@media (max-width: ${theme.breakpoints.mobile}px)`]: {
    gap: 24,
  },
}));

export const Subscribe = () => {
  const { userDisconnected, isSubscribed, setIsOnboarding, isOnboarding, subscribe, isLoading } =
    useAuthContext();
  const { setRoute } = useRouterContext();
  const { loading, channelAddress, isWrongNetwork, error } = useChannelContext();

  const theme = useTheme();

  useEffect(() => {
    if (isSubscribed && !isOnboarding) {
      setRoute(Routes.NotificationsFeed);
    }
  }, [isSubscribed, isOnboarding]);

  if (loading) {
    return (
      <Screen>
        <Flex alignItems={'center'} height={200}>
          <Spinner size={30} />
        </Flex>
      </Screen>
    );
  }

  const handleSubscribe = async () => {
    analytics.track('channel subscribe', { channelAddress });
    setIsOnboarding(true);
    await subscribe();
    setRoute(Routes.ConnectEmail);
  };

  return (
    <Screen mb={1}>
      <Container>
        <SubscribeHeader />
        <Flex alignItems={'center'} direction={'column'} mb={3} mt={2}>
          <SubscribeInfo hideAddress={userDisconnected} />
          <SubscribeDescription
            text={
              userDisconnected
                ? 'is using the Push Protocol to securly message its users. No spam, opt-out at any time.'
                : 'is using the Ethereum Push Notifications protocol to securly message its users. No spam, opt-out at any time.'
            }
          />
        </Flex>
        <Flex direction={'column'} width={'100%'} gap={1}>
          <Flex width={'100%'} alignItems={'center'} direction={'column'} gap={1}>
            {userDisconnected ? (
              <ConnectWalletButtons />
            ) : (
              <Button
                width={'100%'}
                onClick={handleSubscribe}
                disabled={isLoading || isWrongNetwork || !channelAddress}
                size={'lg'}
              >
                Subscribe
              </Button>
            )}
          </Flex>
          {(error || !channelAddress) && (
            <Text color={theme.colors.error.main} align="center">
              Invalid partner key
            </Text>
          )}
          {!userDisconnected && <WrongNetworkError />}
          {!isWrongNetwork && userDisconnected && (
            <Text size={'sm'} mt={1} mb={2} color={'secondary'} opacity={0.8} align={'center'}>
              You will need to sign a message to prove ownership of your wallet.
            </Text>
          )}
        </Flex>
      </Container>
    </Screen>
  );
};
