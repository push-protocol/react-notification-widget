import React from 'react';
import { SettingsTabNames } from '../settings/types';
import { useChannelContext } from 'context/ChannelContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import Button from 'components/Button';
import Link from 'components/Link';
import { Screen } from 'components/layout/Screen';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';

export const SubscriptionFlowEnded = () => {
  const { slug } = useChannelContext();
  const { setRoute } = useRouterContext();

  const handleViewSettings = () => {
    setRoute(Routes.Settings, { activeTab: SettingsTabNames.Discover });
  };

  return (
    <Screen>
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'}>
        <Text size={'xl'} align={'center'} weight={700}>
          You&apos;re all set! 🎉
        </Text>
        <Text p={0.5} lineHeight={1.5} mb={5} size={'lg'} align={'center'}>
          <br />
          Thanks for subscribing! Change the preferences in your ✨&nbsp;Communication Passport
          ✨&nbsp;at any time by visiting
          <Link
            fontSize={'lg'}
            display={'inline-block'}
            src={`https://app.wherever.im/channel/${slug}`}
          >
            &nbsp;app.wherever.im/channel/{slug}&nbsp;
          </Link>
        </Text>
        <Button onClick={handleViewSettings} width={'80%'}>
          View Passport
        </Button>
      </Flex>
    </Screen>
  );
};
