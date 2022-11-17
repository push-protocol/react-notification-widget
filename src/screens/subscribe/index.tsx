import React from 'react';
import Spinner from '../../components/Spinner';
import analytics from '../../services/analytics';
import { useChannelContext } from 'context/ChannelContext';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';
import ConnectDescription from 'screens/components/ConnectDescription';
import ConnectInfo from 'screens/components/ConnectInfo';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import ConnectHeader from 'screens/components/ConnectHeader';

export const Subscribe = () => {
  const { isLoading, subscribe, setIsFirstLogin } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { loading, channelAddress } = useChannelContext();

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
      <ConnectHeader />
      <Flex alignItems={'center'} direction={'column'} mb={3} mt={2}>
        <ConnectInfo />
        <ConnectDescription
          text={
            'is using the Ethereum Push Notifications protocol to securly message its users. No spam, opt-out at any time.'
          }
        />
      </Flex>
      <Flex width={'100%'} alignItems={'center'} direction={'column'} gap={1}>
        <Button width={'100%'} onClick={handleSubscribe} disabled={isLoading} size={'lg'}>
          Subscribe
        </Button>
        <Text size={'sm'} mt={1} mb={2} color={'secondary'} opacity={0.8} align={'center'}>
          You will need to sign a message to prove ownership of your wallet.
        </Text>
      </Flex>
    </Screen>
  );
};
