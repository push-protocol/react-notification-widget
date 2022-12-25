import React from 'react';
import styled from 'styled-components';
import Notice from 'components/Notice';
import ConnectApps from 'components/ConnectApps';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import { useChannelContext } from 'context/ChannelContext';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useUserContext } from 'context/UserContext';
import { MessagingApp } from 'global/types.generated';
import { Web2Channels } from 'context/UserContext/const';

const Header = styled(Flex)`
  text-align: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const SetupChannels = (props: { appsToConnect: MessagingApp[] }) => {
  const { name } = useChannelContext();
  const { setRoute } = useRouterContext();

  const { isSubscribeOnlyMode } = useEnvironment();
  const { userCommsChannels } = useUserContext();

  const handleGoBack = () => {
    setRoute(Routes.SetupPreferences);
  };

  const onFinish = () => {
    setRoute(isSubscribeOnlyMode ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
  };

  const finishButtonEnabled =
    !!userCommsChannels?.email?.exists ||
    !!userCommsChannels?.telegram?.exists ||
    !!userCommsChannels?.discord?.exists;

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle>
          {props.appsToConnect
            ? 'Got it! Now connect your selected channels'
            : 'Stay informed on the go'}
        </PageTitle>
      </Header>

      <Flex mb={2} mt={2} width={'100%'}>
        <ConnectApps apps={props.appsToConnect || Web2Channels} />
      </Flex>
      <Flex width={'100%'} justifyContent={'space-between'} gap={1} mb={2}>
        {props.appsToConnect && (
          <Button onClick={handleGoBack} height={20} width={'100%'} variant={'gray'}>
            Previous
          </Button>
        )}
        <Button onClick={onFinish} height={20} width={'100%'} disabled={!finishButtonEnabled}>
          Finish
        </Button>
      </Flex>
      <Notice text={`${name} won't have access to your info`} />
    </Screen>
  );
};
