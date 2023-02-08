import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import analytics from '../../services/analytics';
import { UserSubscribeSource } from '../../global/types.generated';
import useIsWrongNetwork from '../../hooks/useIsWrongNetwork';
import { WHEREVER_FAQ } from '../../global/const';
import ChannelToUserIcons from './components/ChannelToUserIcons';
import { useUserSubscribeMutation } from './operations.generated';
import NewTag from './components/NewTag';
import ConnectWalletButtons from './components/ConnectWalletButtons';
import { useAccountContext } from 'context/AccountContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useChannelContext } from 'context/ChannelContext';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useUserContext } from 'context/UserContext';
import WrongNetworkError from 'components/Errors/WrongNetworkError';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import Link from 'components/Link';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import PageTitle from 'components/PageTitle';

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
  const { discordToken } = useAuthContext();
  const { isConnected } = useAccountContext();
  const [loadingMsg, setLoadingMsg] = useState('');

  const {
    isSubscribed,
    setIsOnboarding,
    isOnboarding,
    subscribe: signSubscribeMsg,
    isLoading: authLoading,
    login,
  } = useAuthContext();

  const [subscribeUser, { loading: subscribeLoading }] = useUserSubscribeMutation({
    variables: { source: discordToken ? UserSubscribeSource.Discord : undefined },
  });

  const { setRoute } = useRouterContext();
  const {
    loading: channelLoading,
    channelAddress,
    name: channelName,
    messageCategories,
    error,
  } = useChannelContext();
  const isWrongNetwork = useIsWrongNetwork();

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

  if (channelLoading || authLoading || userLoading || subscribeLoading) {
    return (
      <Screen>
        <Flex
          width={300}
          height={250}
          direction={'column'}
          gap={2}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Spinner size={30} />
          <Text align={'center'} size={'sm'}>
            {loadingMsg}
          </Text>
        </Flex>
      </Screen>
    );
  }

  const handleSubscribe = async () => {
    analytics.track('channel subscribe clicked', { channelAddress });
    setIsOnboarding(true);

    setLoadingMsg('Sign the message in your wallet to subscribe');
    await signSubscribeMsg();
    analytics.track('channel subscribe successful', { channelAddress });

    setLoadingMsg('Sign the message in your wallet to verify ownership of your account');
    await login();

    setLoadingMsg('Connecting you to the Wherever network');
    await subscribeUser();

    setRoute(messageCategories.length ? Routes.SelectCategories : Routes.SetupApps);
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
            {isConnected ? (
              <Button
                width={'100%'}
                onClick={handleSubscribe}
                disabled={channelLoading || isWrongNetwork || !channelAddress}
                size={'lg'}
              >
                Subscribe
              </Button>
            ) : (
              <ConnectWalletButtons onConnect={handleSubscribe} />
            )}
            {(error || !channelAddress) && (
              <Text color={theme.w.colors.error.main} align="center">
                Invalid partner key
              </Text>
            )}
          </Flex>
          {isWrongNetwork && <WrongNetworkError action={'subscribe'} />}
        </Flex>
      </Container>
    </Screen>
  );
};
