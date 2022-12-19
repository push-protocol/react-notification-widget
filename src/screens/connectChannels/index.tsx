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

const Header = styled(Flex)`
  width: 250px;
  text-align: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const ConnectChannels = () => {
  const { name } = useChannelContext();
  const { setRoute } = useRouterContext();

  const { isSubscribeOnly } = useEnvironment();
  const { userCommsChannels } = useNotificationsContext();

  const handleFinalizeSubscription = () => {
    setRoute(isSubscribeOnly ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
  };

  const shouldRenderFinishButton =
    !isSubscribeOnly ||
    !!userCommsChannels?.email?.exists ||
    !!userCommsChannels?.telegram?.exists ||
    !!userCommsChannels?.discord?.exists;

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle>Stay informed on the go</PageTitle>
        <Text color={'secondary'} size={'sm'}>
          Get notifications when new messages are received in your wallet
        </Text>
      </Header>
      <Channels />
      {shouldRenderFinishButton && (
        <Flex width={'100%'} justifyContent={'center'} mb={2}>
          <Button onClick={handleFinalizeSubscription} height={20}>
            <Text>Finish</Text>
          </Button>
        </Flex>
      )}
      <HiddenNotice text={`${name} won't have access to your contact info`} />
    </Screen>
  );
};
