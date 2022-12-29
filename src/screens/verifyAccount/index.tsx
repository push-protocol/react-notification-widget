import React, { useEffect } from 'react';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';
import { useAuthContext } from 'context/AuthContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useUserContext } from 'context/UserContext';
import formatAddress from 'helpers/functions/formatAddress';
import { useEnvironment } from 'context/EnvironmentContext';

export const VerifyAccount = () => {
  const { isLoading, login, isLoggedIn } = useAuthContext();
  const { isSubscribeOnlyMode } = useEnvironment();
  const { setRoute } = useRouterContext();
  const { userAddress } = useUserContext();

  useEffect(() => {
    if (isLoggedIn) {
      setRoute(isSubscribeOnlyMode ? Routes.Settings : Routes.NotificationsFeed);
    }
  }, [userAddress, isLoggedIn]);

  const handleLogin = async () => {
    login(() => {
      setRoute(isSubscribeOnlyMode ? Routes.Settings : Routes.NotificationsFeed);
    });
  };

  return (
    <Screen>
      <Flex direction={'column'}>
        <Text size={'2xl'} mb={2} align={'center'} weight={700}>
          Hi, {formatAddress(userAddress)} 👋
        </Text>
        <Text size={'lg'} mb={8} align={'center'}>
          Sign a message with your wallet to verify ownership of your account.
        </Text>
      </Flex>
      <Button
        onClick={handleLogin}
        size={'lg'}
        width={'100%'}
        mb={3}
        isLoading={isLoading}
        disabled={isLoading}
      >
        Verify
      </Button>
    </Screen>
  );
};
