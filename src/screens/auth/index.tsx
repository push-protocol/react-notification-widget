import React from 'react';
import styled from 'styled-components';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import { Routes, useRouterContext } from 'context/RouterContext';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Text from 'components/Text';
import { Check } from 'components/icons';

const HeaderIconContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
`;

const HeaderIcon = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 100px;
`;

export const Auth = () => {
  const { isLoading, error, login, isLoggedIn } = useRouterContext();
  const { setRoute } = useRouterContext();

  const handleLogin = () => {
    login();
  };

  const handleCancel = () => {
    setRoute(Routes.Settings);
  };

  return (
    <Screen>
      {isLoading && (
        <Flex alignItems={'center'} justifyContent={'center'} height={200}>
          <Spinner />
        </Flex>
      )}
      {error && (
        <Flex
          justifyContent="center"
          alignItems="center"
          direction={'column'}
          gap={1}
          height={200}
          width={'100%'}
        >
          <Text>Error logging in</Text>
          <Flex justifyContent="center" alignItems="center" gap={2} width={'100%'}>
            <Button onClick={handleLogin}>Try Again</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Flex>
        </Flex>
      )}
      {isLoggedIn && (
        <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={8} mt={3}>
          <HeaderIconContainer>
            <HeaderIcon>
              <Check />
            </HeaderIcon>
          </HeaderIconContainer>
          <Text size={'xl'} weight={700} mb={0.5}>
            Successfully Logged In
          </Text>
        </Flex>
      )}
    </Screen>
  );
};
