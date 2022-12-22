import React from 'react';
import styled from 'styled-components';
import { Screen } from 'components/layout/Screen';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import { useChannelContext } from 'context/ChannelContext';
import Button from 'components/Button';
import { Routes, useRouterContext } from 'context/RouterContext';

const HeaderIconContainer = styled.div`
  height: 58px;
  width: 58px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
`;

const HeaderIcon = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100px;
`;

export const SubscriptionFlowEnded = () => {
  const { icon } = useChannelContext();
  const { setRoute } = useRouterContext();

  const handleViewSettings = () => {
    setRoute(Routes.Settings);
  };

  return (
    <Screen>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        direction={'column'}
        gap={2}
        mb={8}
        mt={3}
      >
        <HeaderIconContainer>
          <HeaderIcon src={icon} />
        </HeaderIconContainer>
        <Text size={'xl'} align={'center'} weight={700}>
          Thank you for subscribing!
        </Text>
        <Text size={'lg'} align={'center'}>
          Change your preferences at any time by visiting this page again.
        </Text>
        <Button width={'100%'} onClick={handleViewSettings}>
          Continue to Settings
        </Button>
      </Flex>
    </Screen>
  );
};
