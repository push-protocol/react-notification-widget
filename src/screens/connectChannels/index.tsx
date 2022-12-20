import React, { useMemo } from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import Channels from 'components/Channels';
import { useChannelContext } from 'context/ChannelContext';
import HiddenNotice from 'components/HiddenNotice';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useUserContext } from 'context/UserContext';
import { MessagingApp } from 'global/types.generated';
import { isPreferenceChannelSelected } from 'context/UserContext/useChannelPreferences';
import { DefaultUserChannels } from 'context/UserContext/const';
import useDiscordActions from 'components/Channels/components/discord/useDiscordActions';
import Text from 'components/Text';

const Header = styled(Flex)`
  width: 250px;
  text-align: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const ConnectChannels = () => {
  const { name, discordGuildUrl } = useChannelContext();
  const { userPreferences, userPreferencesCount } = useUserContext();
  const { setRoute } = useRouterContext();
  const { isConnected } = useDiscordActions();

  const { isSubscribeOnly } = useEnvironment();
  const { userCommsChannels } = useUserContext();

  const handleGoBack = () => {
    setRoute(Routes.SetupPreferences);
  };

  const handleFinalizeSubscription = () => {
    setRoute(isSubscribeOnly ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
  };

  const filteredConnectedChannels = useMemo(() => {
    return DefaultUserChannels.filter((channel) => {
      if (channel === MessagingApp.Discord) {
        return (
          isPreferenceChannelSelected(userPreferences, channel) && (isConnected || discordGuildUrl)
        );
      } else {
        return isPreferenceChannelSelected(userPreferences, channel);
      }
    });
  }, [discordGuildUrl, isConnected, userPreferences]);

  const finishButtonEnabled =
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
      <Channels channels={filteredConnectedChannels} />
      <Flex width={'100%'} justifyContent={'space-between'} gap={1} mb={2}>
        {!!userPreferencesCount && (
          <Button onClick={handleGoBack} height={20} width={'100%'} variant={'gray'}>
            Previous
          </Button>
        )}
        <Button
          onClick={handleFinalizeSubscription}
          height={20}
          width={'100%'}
          disabled={!finishButtonEnabled}
        >
          Finish
        </Button>
      </Flex>
      <HiddenNotice text={`${name} won't have access to your contact info`} />
    </Screen>
  );
};
