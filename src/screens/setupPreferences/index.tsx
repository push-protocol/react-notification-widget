import React, { useMemo } from 'react';
import styled from 'styled-components';
import analytics from '../../services/analytics';
import Notice from 'components/Notice';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import { useChannelContext } from 'context/ChannelContext';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import Preferences from 'components/Preferences/index';
import { MessagingApp } from 'global/types.generated';
import { useUserContext } from 'context/UserContext';
import { Web2Channels, Web2ChannelLower } from 'context/UserContext/const';

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export const SetupPreferences = () => {
  const { discordGuildUrl, messageCategories } = useChannelContext();
  const { user } = useUserContext();
  const { setRoute } = useRouterContext();
  const { isSubscribeOnlyMode } = useEnvironment();

  const appConfig = Web2Channels.filter((channel) =>
    channel === MessagingApp.Discord ? discordGuildUrl && isSubscribeOnlyMode : true
  ).map((app) => ({ app, enabled: true }));

  const goNextDisabled = user?.preferences.every((pref) => !pref?.enabled);

  const appsToConnect = useMemo(() => {
    return Web2Channels.filter((channel) => {
      const selectedByUser = user?.preferences.some(
        (pref) => pref[channel.toLowerCase() as Web2ChannelLower]
      );

      return channel === MessagingApp.Discord
        ? selectedByUser && discordGuildUrl && isSubscribeOnlyMode
        : selectedByUser;
    });
  }, [discordGuildUrl, user]);

  const handleGoNext = () => {
    const selectedCategories = user?.preferences.filter((pref) => pref.enabled) || [];
    analytics.track('preferences set up', {
      numCategories: messageCategories.length,
      categoriesSelected: selectedCategories.length,
      discordOn: selectedCategories.filter((pref) => pref.discord).length,
      telegramOn: selectedCategories.filter((pref) => pref.telegram).length,
      emailOn: selectedCategories.filter((pref) => pref.email).length,
      categories: messageCategories,
      userPreferences: user?.preferences,
    });

    if (appsToConnect.length) {
      setRoute(Routes.SetupChannels, { appsToConnect });
    } else {
      setRoute(isSubscribeOnlyMode ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
    }
  };

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>Where and what should we notify you about?</PageTitle>
      </Header>

      <Preferences messagingApps={appConfig} />

      <Flex direction={'column'} gap={2} mb={2} mt={2} width={'100%'}>
        <Notice text={'Messages from enabled categories will be available in-app by default'} />

        <Button size={'lg'} width={'100%'} onClick={handleGoNext} disabled={goNextDisabled}>
          Next
        </Button>
      </Flex>
    </Screen>
  );
};
