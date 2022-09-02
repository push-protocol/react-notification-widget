import React from 'react';
import styled from 'styled-components';
import { channels, api } from '@epnsproject/frontend-sdk-staging';
import { useAccount, useSigner } from 'wagmi';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';
import NewTag from 'components/NewTag';
import SubscribeDescription from 'screens/subscribe/components/SubscribeDescription';
import SubscribeInfo from 'screens/subscribe/components/SubscribeInfo';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useChannelContext } from 'context/ChannelContext';
import { CHAIN_ID } from 'global/const';

const StyledNewTag = styled(NewTag)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

export const Subscribe = () => {
  const { setRoute } = useRouterContext();
  const { addr: channelAddress } = useChannelContext();
  const { address: userAddress } = useAccount();
  const { data: signer } = useSigner();

  const handleSubscribe = async () => {
    return await channels.optIn(signer, channelAddress, CHAIN_ID, userAddress, {
      onSuccess: () => setRoute(Routes.ConnectEmail),
      env: 'staging',
    });
  };

  return (
    <CenteredContainer>
      <Flex alignItems={'center'} direction={'column'} mb={4}>
        <StyledNewTag />
        <Text size={'xl'} weight={700}>
          Wallet-to-wallet notifications
        </Text>
      </Flex>
      <Flex alignItems={'center'} direction={'column'} mb={4}>
        <SubscribeInfo />
        <SubscribeDescription />
      </Flex>
      <Flex width={'100%'} alignItems={'center'} direction={'column'} gap={1}>
        <Button onClick={handleSubscribe}>Subscribe</Button>
        <Text size={'sm'} color={'secondary'} opacity={0.8} align={'center'}>
          You will need to sign a message to prove ownership of your wallet.
        </Text>
      </Flex>
    </CenteredContainer>
  );
};
