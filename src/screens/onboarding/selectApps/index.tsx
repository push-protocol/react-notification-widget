import React, { useMemo } from 'react';
import styled from 'styled-components';
import analytics from '../../../services/analytics';
import { MessagingApp } from '../../../global/types.generated';
import { useAuthContext } from 'context/AuthContext';
import { useChannelContext } from 'context/ChannelContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useUserContext } from 'context/UserContext';
import { Web2AppLower, Web2Apps } from 'context/UserContext/const';
import Preferences from 'components/Preferences';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export const SelectApps = () => {
  const { discordGuildUrl, messageCategories, name } = useChannelContext();
  const { user } = useUserContext();
  const { setRoute } = useRouterContext();
  const { discordToken } = useAuthContext();
  const { isSubscribeOnlyMode } = useEnvironment();

  const appConfig = Web2Apps.filter((app) =>
    app === MessagingApp.Discord ? discordGuildUrl && discordToken : true
  ).map((app) => ({ app, enabled: true }));

  const appsToConnect = useMemo(() => {
    return Web2Apps.filter((channel) => {
      const selectedByUser = user?.preferences.some(
        (pref) => pref[channel.toLowerCase() as Web2AppLower]
      );

      return channel === MessagingApp.Discord
        ? selectedByUser && discordGuildUrl && discordToken
        : selectedByUser;
    });
  }, [discordGuildUrl, user]);

  const onNext = () => {
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
      setRoute(Routes.SetupApps, { appsToConnect });
    } else {
      setRoute(isSubscribeOnlyMode ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
    }
  };

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>Where else should we notify you?</PageTitle>
        <Text mb={2} color={'secondary'}>
          {`${name} won't have access to your contact info`}
        </Text>
      </Header>

      <Preferences hideDescriptions appConfig={appConfig} />

      <Flex mb={2} mt={2} gap={1} width={'100%'}>
        <Button
          size={'lg'}
          variant={'gray'}
          width={'100%'}
          onClick={() => setRoute(Routes.SelectCategories)}
        >
          Previous
        </Button>
        <Button size={'lg'} width={'100%'} onClick={onNext}>
          Next
        </Button>
      </Flex>
    </Screen>
  );
};
