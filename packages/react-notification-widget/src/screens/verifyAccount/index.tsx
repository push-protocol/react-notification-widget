import React, { useEffect } from 'react';
import { useEnsName } from 'wagmi';
import formatAddress from '../../helpers/functions/formatAddress';
import { useAuthContext } from 'context/AuthContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useUserContext } from 'context/UserContext';
import { useEnvironment } from 'context/EnvironmentContext';
import Text from 'components/Text';
import Button from 'components/Button';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';

export const VerifyAccount = () => {
  const { isLoading, login, isLoggedIn } = useAuthContext();
  const { isSubscribeOnlyMode } = useEnvironment();
  const { setRoute } = useRouterContext();
  const { userAddress } = useUserContext();
  const { data: userEns } = useEnsName({ address: userAddress });

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
          Hi{userEns || formatAddress(userAddress)} 👋
        </Text>
        <Text size={'lg'} mb={8} align={'center'}>
          Sign a message with your wallet to verify ownership of your account.
        </Text>
      </Flex>
      <Button
        onClick={handleLogin}
        pl={4}
        pr={4}
        size={'lg'}
        mb={2}
        isLoading={isLoading}
        disabled={isLoading}
      >
        Verify
      </Button>
    </Screen>
  );
};
