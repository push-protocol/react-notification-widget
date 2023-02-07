import React from 'react';
import styled from 'styled-components';
import { Routes, useRouterContext } from '../../context/RouterContext';
import { Screen } from '../../components/layout/Screen';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { Check } from '../../components/icons';
import Flex from '../../components/layout/Flex';

const HeaderIconContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.w.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.w.spacing(1.5)}px;
`;

const HeaderIcon = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 100px;
  color: ${({ theme }) => theme.w.colors.button.text};
`;

type PropsT = {
  channel: string;
};

export const ChannelAdded = (props: PropsT) => {
  const { setRoute } = useRouterContext();

  // user is redirected here during onboarding. This marks the end.
  const handleContinue = () => {
    setRoute(Routes.NotificationsFeed);
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
          <HeaderIcon>
            <Check />
          </HeaderIcon>
        </HeaderIconContainer>
        <Text size={'xl'} align={'center'} weight={700}>
          You&apos;re all set!
        </Text>
        <Text size={'md'} align={'center'} weight={700} mb={0.5}>
          {props.channel && `${props.channel} was connected successfully`}
        </Text>
      </Flex>
      <Flex width={'100%'} mb={3}>
        <Button onClick={handleContinue} width={'100%'} p={1.5}>
          Continue
        </Button>
      </Flex>
    </Screen>
  );
};
