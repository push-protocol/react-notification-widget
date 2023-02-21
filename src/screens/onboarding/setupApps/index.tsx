import React, { useState } from 'react';
import styled from 'styled-components';
import analytics from 'services/analytics';
import { MessagingApp } from 'global/types.generated';
import { useAuthContext } from 'context/AuthContext';
import { useChannelContext } from 'context/ChannelContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useUserContext } from 'context/UserContext';
import { Web2Apps } from 'context/UserContext/const';
import Notice from 'components/Notice';
import ConnectApps from 'components/ConnectApps';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';

const Header = styled(Flex)`
  text-align: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const SetupApps = (props: { appsToConnect: MessagingApp[] }) => {
  const { name, discordGuildUrl } = useChannelContext();
  const { setIsOnboarding, discordToken } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { isSubscribeOnlyMode } = useEnvironment();
  const { userCommsChannels } = useUserContext();

  const onFinish = () => {
    analytics.track('channels set up', {
      email: userCommsChannels?.email?.exists,
      discord: userCommsChannels?.discord?.exists,
      telegram: userCommsChannels?.telegram?.exists,
    });

    setIsOnboarding(false);
    setRoute(isSubscribeOnlyMode ? Routes.SubscriptionFlowEnded : Routes.NotificationsFeed);
  };

  const apps =
    props.appsToConnect ||
    Web2Apps.filter((app) =>
      app === MessagingApp.Discord ? discordGuildUrl && discordToken : true
    );

  const [appOpen, setAppOpen] = useState<MessagingApp | undefined>(apps?.[0]);

  const finishButtonEnabled =
    !!userCommsChannels?.email?.exists ||
    !!userCommsChannels?.telegram?.exists ||
    !!userCommsChannels?.discord?.exists;

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle>
          {props.appsToConnect
            ? 'Got it! Now connect the apps you selected'
            : 'Stay informed on the go'}
        </PageTitle>
      </Header>

      <Flex mb={4} mt={2} width={'100%'}>
        <ConnectApps apps={apps} appOpen={appOpen} setAppOpen={setAppOpen} />
      </Flex>
      <Flex width={'100%'} justifyContent={'space-between'} gap={1} mb={2}>
        {props.appsToConnect && (
          <Button
            onClick={() => setRoute(Routes.SelectCategories)}
            size={'lg'}
            width={'100%'}
            variant={'gray'}
          >
            Previous
          </Button>
        )}
        <Button onClick={onFinish} size={'lg'} width={'100%'} disabled={!finishButtonEnabled}>
          Finish
        </Button>
      </Flex>
      <Notice text={`${name} won't have access to your info`} />
    </Screen>
  );
};
