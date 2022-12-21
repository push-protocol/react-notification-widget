import React, { useMemo } from 'react';
import styled from 'styled-components';
import { isPreferenceChannelSelected } from '../../context/UserContext/useChannelPreferences';
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
import { Web2Channels } from 'context/UserContext/const';

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export const SetupPreferences = () => {
  const { discordGuildUrl } = useChannelContext();
  const { preferences, userPreferencesLoading } = useUserContext();
  const { setRoute } = useRouterContext();
  const { isSubscribeOnlyMode } = useEnvironment();

  const appConfig = Web2Channels.filter((channel) =>
    channel === MessagingApp.Discord ? !!discordGuildUrl : true
  ).map((app) => ({ app, enabled: true }));

  const goNextDisabled = preferences.every((pref) => !pref.userPreference?.enabled);

  const appsToConnect = useMemo(() => {
    return Web2Channels.filter((channel) => {
      if (channel === MessagingApp.Discord) {
        return isPreferenceChannelSelected(preferences, channel) && discordGuildUrl;
      }

      return isPreferenceChannelSelected(preferences, channel);
    });
  }, [discordGuildUrl, preferences]);

  const handleGoNext = () => {
    if (appsToConnect.length) {
      setRoute(Routes.ConnectChannels, { appsToConnect });
    } else {
      setRoute(isSubscribeOnlyMode ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
    }
  };

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>Where and what should we notify you about?</PageTitle>
      </Header>
      {userPreferencesLoading ? (
        <Flex width={'100%'} height={150}>
          <Spinner size={24} />
        </Flex>
      ) : (
        <>
          <Preferences messagingApps={appConfig} />
          <Flex mb={2} mt={2} width={'100%'}>
            <Button size={'lg'} width={'100%'} onClick={handleGoNext} disabled={goNextDisabled}>
              Next
            </Button>
          </Flex>
        </>
      )}
      <HiddenNotice text={'You can change your preferences later at any time'} />
    </Screen>
  );
};
