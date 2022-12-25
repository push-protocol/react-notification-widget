import React from 'react';
import { useTheme } from 'styled-components';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';
import { useAuthContext } from 'context/AuthContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useUserContext } from 'context/UserContext';
import formatAddress from 'helpers/functions/formatAddress';
import { useEnvironment } from 'context/EnvironmentContext';

export const Login = () => {
  const { isLoading, login } = useAuthContext();
  const { isSubscribeOnlyMode } = useEnvironment();
  const { setRoute } = useRouterContext();
  const { userAddress } = useUserContext();
  const theme = useTheme();

  const handleLogin = async () => {
    login(() => {
      setRoute(isSubscribeOnlyMode ? Routes.Settings : Routes.NotificationsFeed);
    });
  };

  return (
    <Screen>
      <Flex justifyContent={'space-between'} direction={'column'} alignItems={'center'}></Flex>
      <Flex direction={'column'}>
        <Text size={'2xl'} mb={2} align={'center'} weight={700}>
          Hi, {formatAddress(userAddress)} 👋
        </Text>
        <Text size={'xl'} mb={8} align={'center'}>
          Sign in with your wallet to access your notifications
        </Text>
      </Flex>
      <Button
        onClick={handleLogin}
        size={'lg'}
        width={'100%'}
        mb={1}
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>
      <Text align={'center'} mb={5} size={'sm'} color={theme.colors.light[50]}>
        You will need to sign a message to prove ownership of your wallet.
      </Text>
    </Screen>
  );
};
