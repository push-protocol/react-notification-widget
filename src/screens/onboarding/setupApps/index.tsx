import React, { useState, useMemo } from 'react';
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
  const { userCommsChannels, setUserCommsChannelsPollInterval } = useUserContext();

  const onFinish = () => {
    analytics.track('channels set up', {
      email: userCommsChannels?.email?.exists,
      discord: userCommsChannels?.discord?.exists,
      telegram: userCommsChannels?.telegram?.exists,
    });

    setUserCommsChannelsPollInterval(0);
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

  const heading = useMemo(() => {
    if (!props.appsToConnect) {
      // channel has no categories
      return 'Stay informed on the go';
    }

    if (isSubscribeOnlyMode) {
      // got here without selecting specific apps
      return 'Where else should we notify you?';
    }

    return 'Got it! Now connect the apps you selected';
  }, [isSubscribeOnlyMode, props]);

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle>{heading}</PageTitle>
        <Notice mt={0.5} text={`Wherever will forward messages sent to you wallet`} />
      </Header>

      <Flex mb={4} mt={2} width={'100%'}>
        <ConnectApps apps={apps} appOpen={appOpen} setAppOpen={setAppOpen} />
      </Flex>
      <Flex width={'100%'} justifyContent={'space-between'} gap={1} mb={2}>
        {props.appsToConnect && (
          <Button
            onClick={() =>
              setRoute(isSubscribeOnlyMode ? Routes.SelectCategories : Routes.SelectApps)
            }
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
      <Notice mb={1} text={`Wherever will never share your info with ${name} or anyone else.`} />
    </Screen>
  );
};
