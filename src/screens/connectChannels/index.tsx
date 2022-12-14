import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import Channels from 'components/Channels';
import { useChannelContext } from 'context/ChannelContext';
import HiddenNotice from 'components/HiddenNotice';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import Text from 'components/Text';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useNotificationsContext } from 'context/NotificationsContext';

const Header = styled.div`
  width: 210px;
  text-align: center;
`;

export const ConnectChannels = () => {
  const { name } = useChannelContext();
  const { setRoute } = useRouterContext();

  const { isSubscribeOnly } = useEnvironment();
  const { userCommsChannels } = useNotificationsContext();

  const handleGoBack = () => {
    setRoute(Routes.UserPreferences);
  };

  const handleFinalizeSubscription = () => {
    setRoute(isSubscribeOnly ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
  };

  const finishButtonDisabled =
    !userCommsChannels?.email?.exists &&
    !userCommsChannels?.telegram?.exists &&
    !userCommsChannels?.discord?.exists;

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>Connect the channels you selected</PageTitle>
      </Header>
      <Channels showDiscord={true} showEmail={true} showTelegram={true} />
      <Flex width={'100%'} justifyContent={'space-between'} gap={1} mb={2}>
        <Button onClick={handleGoBack} height={20} width={'100%'} variant={'gray'}>
          <Text>Previous</Text>
        </Button>
        <Button
          onClick={handleFinalizeSubscription}
          height={20}
          width={'100%'}
          disabled={finishButtonDisabled}
        >
          <Text>Finish</Text>
        </Button>
      </Flex>
      <HiddenNotice text={`${name} won't have access to your contact info`} />
    </Screen>
  );
};
