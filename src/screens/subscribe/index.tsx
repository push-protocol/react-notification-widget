import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import Spinner from '../../components/Spinner';
import analytics from '../../services/analytics';
import NewTag from '../../components/NewTag';
import PageTitle from '../../components/PageTitle';
import { useUserSubscribedMutation } from './operations.generated';
import { WHEREVER_FAQ } from 'global/const';
import { Routes, useRouterContext } from 'context/RouterContext';
import Button from 'components/Button';
import Link from 'components/Link';
import { useChannelContext } from 'context/ChannelContext';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import ChannelToUserIcons from 'screens/subscribe/components/ChannelToUserIcons';
import WrongNetworkError from 'components/Errors/WrongNetworkError';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useUserContext } from 'context/UserContext';

const Container = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  [`@media (max-width: ${theme.w.breakpoints.mobile}px)`]: {
    gap: 24,
  },
}));

const SubscribeDescription = styled.div`
  text-align: center;
  line-height: 22px;
`;

export const Subscribe = () => {
  const { isSubscribeOnlyMode } = useEnvironment();
  const {
    userDisconnected,
    isSubscribed,
    setIsOnboarding,
    isOnboarding,
    subscribe,
    isLoading: authLoading,
    login,
  } = useAuthContext();

  const [subscribeUser] = useUserSubscribedMutation();
  const { setRoute } = useRouterContext();
  const {
    loading: channelLoading,
    channelAddress,
    name: channelName,
    messageCategories,
    isWrongNetwork,
    error,
  } = useChannelContext();

  const { isLoading: userLoading } = useUserContext();
  const theme = useTheme();

  useEffect(() => {
    if (isSubscribed && !isOnboarding) {
      if (isSubscribeOnlyMode) {
        setRoute(Routes.Settings);
      } else {
        setRoute(Routes.NotificationsFeed);
      }
    }
  }, [isSubscribed, isOnboarding, isSubscribeOnlyMode]);

  if (channelLoading || authLoading || userLoading) {
    return (
      <Screen>
        <Flex alignItems={'center'} height={300}>
          <Spinner size={30} />
        </Flex>
      </Screen>
    );
  }

  const handleSubscribe = async () => {
    analytics.track('channel subscribe clicked', { channelAddress });
    setIsOnboarding(true);
    await subscribe();
    analytics.track('channel subscribe successful', { channelAddress });

    await login();

    subscribeUser(); // don't wait for this to finish as it can trigger workflows

    setRoute(messageCategories.length ? Routes.SetupPreferences : Routes.SetupChannels);
  };

  return (
    <Screen mb={1}>
      <Container>
        <Flex alignItems={'center'} direction={'column'} gap={1}>
          <NewTag />
          <PageTitle align={'center'}>Wallet-to-wallet notifications</PageTitle>
        </Flex>
        <Flex alignItems={'center'} direction={'column'} mb={3} mt={2}>
          <ChannelToUserIcons />
          <SubscribeDescription>
            <Text size={'md'}>
              {`${channelName} is using the Ethereum Push Notifications protocol to securely message its users. No spam, opt-out at any time.`}{' '}
              <Link display={'inline-block'} src={WHEREVER_FAQ}>
                Learn more.
              </Link>
            </Text>
          </SubscribeDescription>
        </Flex>

        <Flex direction={'column'} width={'100%'} gap={1}>
          <Flex
            width={'100%'}
            mb={2}
            alignItems={'center'}
            justifyContent={'center'}
            direction={'column'}
            gap={1}
          >
            <Button
              width={'100%'}
              onClick={handleSubscribe}
              disabled={channelLoading || isWrongNetwork || !channelAddress}
              size={'lg'}
            >
              Subscribe
            </Button>
            {(error || !channelAddress) && (
              <Text color={theme.w.colors.error.main} align="center">
                Invalid partner key
              </Text>
            )}
          </Flex>
          {!userDisconnected && <WrongNetworkError />}
          {!isWrongNetwork && userDisconnected && (
            <Text size={'sm'} mt={1} mb={2} color={'secondary'} opacity={0.8} align={'center'}>
              You will need to sign a message to prove ownership of your wallet.
            </Text>
          )}
        </Flex>
      </Container>
    </Screen>
  );
};
