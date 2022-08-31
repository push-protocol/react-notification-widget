import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';
import NewTag from 'components/NewTag';
import SubscribeDescription from 'screens/subscribe/components/SubscribeDescription';
import SubscribeInfo from 'screens/subscribe/components/SubscribeInfo';
import { Routes, useRouterContext } from 'context/RouterContext';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNewTag = styled(NewTag)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

export const Subscribe = () => {
  const { setRoute } = useRouterContext();

  const handleSubscribe = () => {
    setRoute(Routes.Settings);
  };

  return (
    <Container>
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
    </Container>
  );
};
