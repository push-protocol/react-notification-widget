import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { isPreferenceChannelSelected } from 'context/UserContext/useChannelPreferences';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import { useChannelContext } from 'context/ChannelContext';
import HiddenNotice from 'components/HiddenNotice';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import Preferences from 'components/Preferences/index';
import { MessagingApp } from 'global/types.generated';
import Spinner from 'components/Spinner';
import { useUserContext } from 'context/UserContext';
import { DefaultUserChannels } from 'context/UserContext/const';

const Header = styled.div`
  width: 250px;
  text-align: center;
`;

export const SetupPreferences = () => {
  const { discordGuildUrl } = useChannelContext();
  const { userPreferences, userPreferencesLoading } = useUserContext();
  const { setRoute } = useRouterContext();
  const { isSubscribeOnly } = useEnvironment();

  const [userConnectedChannels] = useState<MessagingApp[]>(DefaultUserChannels);

  const filteredUserPreferences = useMemo(() => {
    return userConnectedChannels.filter((channel) =>
      !discordGuildUrl ? channel !== MessagingApp.Discord : true
    );
  }, [discordGuildUrl, userConnectedChannels]);

  const goNextDisabled = Object.values(userPreferences).every((pref) => !pref['enabled']);

  const channelSelection = [
    isPreferenceChannelSelected(userPreferences, MessagingApp.Discord),
    isPreferenceChannelSelected(userPreferences, MessagingApp.Telegram),
    isPreferenceChannelSelected(userPreferences, MessagingApp.Email),
  ];

  const handleGoNext = () => {
    if (channelSelection.some((channelEnabled) => channelEnabled)) {
      setRoute(Routes.ConnectChannels);
    } else {
      setRoute(isSubscribeOnly ? Routes.SubscriptionFlowEnded : Routes.Settings);
    }
  };

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>Choose where and what we should notify you about</PageTitle>
      </Header>
      {userPreferencesLoading ? (
        <Flex width={'100%'} height={150}>
          <Spinner size={24} />
        </Flex>
      ) : (
        <>
          <Preferences userChannels={filteredUserPreferences} />
          <Flex mb={2} mt={2} width={'100%'}>
            <Button width={'100%'} onClick={handleGoNext} disabled={goNextDisabled}>
              Next
            </Button>
          </Flex>
        </>
      )}
      <HiddenNotice text={'You can change your preferences later at any time'} />
    </Screen>
  );
};
