import React from 'react';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import Channels from 'components/Channels';
import { useChannelContext } from 'context/ChannelContext';
import WrongNetworkError from 'components/Errors/WrongNetworkError';
import HiddenNotice from 'components/HiddenNotice';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import Text from 'components/Text';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useNotificationsContext } from 'context/NotificationsContext';

export const ConnectChannels = () => {
  const { name } = useChannelContext();
  const { setRoute } = useRouterContext();

  const { isSubscribeOnly } = useEnvironment();
  const { userCommsChannels } = useNotificationsContext();

  const handleFinalizeSubscription = () => {
    setRoute(isSubscribeOnly ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
  };

  const shouldRenderFinishButton =
    isSubscribeOnly &&
    (!!userCommsChannels?.email?.exists ||
      !!userCommsChannels?.telegram?.exists ||
      !!userCommsChannels?.discord?.exists);

  return (
    <Screen mb={1}>
      <PageTitle mb={1}>Set Up Notifications</PageTitle>
      <WrongNetworkError mb={2} />
      <Channels />

      {shouldRenderFinishButton && (
        <Flex width={'100%'} justifyContent={'center'}>
          <Button onClick={handleFinalizeSubscription} height={20}>
            <Text>Finish</Text>
          </Button>
        </Flex>
      )}

      <HiddenNotice text={`${name} won't have access to your contact info`} />
    </Screen>
  );
};
