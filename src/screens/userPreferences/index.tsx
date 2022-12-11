import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import { useChannelContext } from 'context/ChannelContext';
import HiddenNotice from 'components/HiddenNotice';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import Text from 'components/Text';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useNotificationsContext } from 'context/NotificationsContext';
import Preferences from 'components/Preferences/index';

const Header = styled.div`
  width: 250px;
  text-align: center;
`;

export const UserPreferences = () => {
  const { enabledPrefs } = useChannelContext();
  const { setRoute } = useRouterContext();

  const { isSubscribeOnly } = useEnvironment();
  const { userCommsChannels } = useNotificationsContext();

  const goNextDisabled = !Object.values(enabledPrefs).some((value) => value);

  const handleGoNext = () => {
    setRoute(Routes.ConnectChannels);
  };

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>Choose what and where we should notify you about</PageTitle>
      </Header>
      <Preferences />
      <Flex mb={2} mt={2} width={'100%'}>
        <Button width={'100%'} onClick={handleGoNext} disabled={goNextDisabled}>
          Next
        </Button>
      </Flex>
      <HiddenNotice text={'You can change your preferences at any time'} />
    </Screen>
  );
};
