import React from 'react';
import styled from 'styled-components';
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
import { useRouterContext } from 'context/RouterContext';

const StyledNewTag = styled(NewTag)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

export const Subscribe = () => {
  const { isLoading, subscribe } = useRouterContext();
  const { loading, channelAddress, disableAnalytics } = useChannelContext();

  const handleSubscribe = async () => {
    if (!disableAnalytics) {
      analytics.track('channel subscribe', { channelAddress });
    }

    subscribe();
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
        <StyledNewTag />
        <Text size={'xl'} weight={700} align={'center'}>
          Wallet-to-wallet notifications
        </Text>
      </Flex>
      <Flex alignItems={'center'} direction={'column'} mb={4}>
        <SubscribeInfo />
        <SubscribeDescription />
      </Flex>
      <Flex width={'100%'} alignItems={'center'} direction={'column'} gap={1}>
        <Button
          variant={isLoading ? 'gray' : 'primary'}
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          Subscribe
        </Button>
        <Text size={'sm'} mt={1} mb={2} color={'secondary'} opacity={0.8} align={'center'}>
          You will need to sign a message to prove ownership of your wallet.
        </Text>
      </Flex>
    </Screen>
  );
};
