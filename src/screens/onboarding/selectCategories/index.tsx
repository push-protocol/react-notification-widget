import React from 'react';
import styled from 'styled-components';
import { Web2AppLower, Web2Apps } from '../../../context/UserContext/const';
import { MessagingApp } from '../../../global/types.generated';
import { useChannelContext } from '../../../context/ChannelContext';
import { useAuthContext } from '../../../context/AuthContext';
import useUpdatePreference from '../../../components/Preferences/useUpdatePreference';
import { useEnvironment } from '../../../context/EnvironmentContext';
import Notice from '../../../components/Notice';
import { useUserPreferencesUpdateMutation } from '../../../components/Preferences/operations.generated';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useUserContext } from 'context/UserContext';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import Preferences from 'components/Preferences';

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export const SelectCategories = () => {
  const { discordGuildUrl, messageCategories } = useChannelContext();
  const { user } = useUserContext();
  const { setRoute } = useRouterContext();
  const { discordToken } = useAuthContext();
  const { isSubscribeOnlyMode } = useEnvironment();
  const [updateUserPreferences] = useUserPreferencesUpdateMutation();

  const goNextDisabled = user?.preferences.every((pref) => !pref?.enabled);

  const handleGoNext = () => {
    if (!isSubscribeOnlyMode) {
      return setRoute(Routes.SelectApps);
    }

    const appsToConnect = Web2Apps.filter((app) =>
      app === MessagingApp.Discord ? discordGuildUrl && discordToken : true
    );

    messageCategories.forEach((category) => {
      const userPref = user?.preferences?.find(
        (userPref) => userPref.commsChannelTagId === category.id
      );

      if (userPref?.enabled) {
        updateUserPreferences({
          variables: {
            input: {
              enabled: true,
              email: true,
              telegram: true,
              discord: true,
              commsChannelTagId: category.id,
            },
          },
        });
      }
    });

    setRoute(Routes.SetupApps, { appsToConnect });
  };

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>What should we notify you about?</PageTitle>
      </Header>

      <Preferences appConfig={[]} />

      <Flex mb={2} mt={2} width={'100%'}>
        <Button size={'lg'} width={'100%'} onClick={handleGoNext} disabled={goNextDisabled}>
          Next
        </Button>
      </Flex>
      {isSubscribeOnlyMode && (
        <Notice mb={1} text={'You can update your preferences at any time'} />
      )}
    </Screen>
  );
};
