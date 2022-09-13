import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from 'components/layout/CenteredContainer';
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

  const handleSubscribe = async () => {
    subscribe();
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
    </CenteredContainer>
  );
};
