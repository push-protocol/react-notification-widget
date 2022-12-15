import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import { useChannelContext } from 'context/ChannelContext';
import HiddenNotice from 'components/HiddenNotice';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import Preferences from 'components/Preferences/index';
import {
  defaultUserChannels,
  isPreferenceChannelSelected,
} from 'context/ChannelContext/usePreferenceActions';
import { MessagingApp } from 'global/types.generated';

const Header = styled.div`
  width: 250px;
  text-align: center;
`;

export const UserPreferences = () => {
  const { userPreferences, discordGuildUrl } = useChannelContext();
  const { setRoute } = useRouterContext();
  const { isSubscribeOnly } = useEnvironment();

  const [userChannels, setUserChannels] = useState<MessagingApp[]>(defaultUserChannels);

  useEffect(() => {
    setUserChannels(
      userChannels.filter((channel) => (!discordGuildUrl ? channel !== MessagingApp.Discord : true))
    );
  }, [discordGuildUrl]);

  const goNextDisabled = !Object.values(userPreferences).some((value) => value['enabled']);

  const channelSelection = [
    isPreferenceChannelSelected(userPreferences, MessagingApp.Discord),
    isPreferenceChannelSelected(userPreferences, MessagingApp.Telegram),
    isPreferenceChannelSelected(userPreferences, MessagingApp.Email),
  ];

  const handleGoNext = () => {
    if (channelSelection.some((value) => value)) {
      setRoute(Routes.ConnectChannels);
    } else {
      setRoute(isSubscribeOnly ? Routes.SubscriptionFlowEnded : Routes.Settings);
    }
  };

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>Choose what and where we should notify you about</PageTitle>
      </Header>
      <Preferences userChannels={userChannels} />
      <Flex mb={2} mt={2} width={'100%'}>
        <Button width={'100%'} onClick={handleGoNext} disabled={goNextDisabled}>
          Next
        </Button>
      </Flex>
      <HiddenNotice text={'You can change your preferences at any time'} />
    </Screen>
  );
};
