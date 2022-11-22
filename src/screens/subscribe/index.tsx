import React from 'react';
import { useTheme } from 'styled-components';
import Spinner from '../../components/Spinner';
import { useChannelContext } from 'context/ChannelContext';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import SubscribeDescription from 'screens/subscribe/components/SubscribeDescription';
import SubscribeInfo from 'screens/subscribe/components/SubscribeInfo';
import SubscribeHeader from 'screens/subscribe/components/SubscribeHeader';
import WrongNetworkError from 'components/Errors/WrongNetworkError';
import ConnectWalletButtons from 'screens/subscribe/components/ConnectWalletButtons';
import SubscribeActions from 'screens/subscribe/components/SubscribeActions';
import { useAuthContext } from 'context/AuthContext';

export const Subscribe = () => {
  const { userDisconnected } = useAuthContext();
  const { loading, channelAddress, isWrongNetwork, error } = useChannelContext();

  const theme = useTheme();

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
    <Screen mb={1}>
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
          {userDisconnected ? <ConnectWalletButtons /> : <SubscribeActions />}
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
    </Screen>
  );
};
