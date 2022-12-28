import React from 'react';
import Notice from 'components/Notice';
import { Screen } from 'components/layout/Screen';
import Button from 'components/Button';
import Flex from 'components/layout/Flex';
import ConnectApps from 'components/ConnectApps';
import { useChannelContext } from 'context/ChannelContext';
import WrongNetworkError from 'components/Errors/WrongNetworkError';
import NavbarActions from 'screens/settings/components/NavbarActions';
import SettingsHeader from 'screens/settings/components/SettingsHeader';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import Preferences from 'components/Preferences';
import { useUserContext } from 'context/UserContext';
import { MessagingApp } from 'global/types.generated';
import { Web2Channels } from 'context/UserContext/const';

export const Settings = () => {
  const { isSubscribeOnlyMode } = useEnvironment();
  const { userCommsChannels } = useUserContext();
  const { name, icon, discordGuildUrl, messageCategories } = useChannelContext();
  const { unsubscribe } = useAuthContext();

  const appConfig = [MessagingApp.Telegram, MessagingApp.Email, MessagingApp.Discord]
    .map((app) => ({
      app,
      enabled: userCommsChannels?.[app.toLowerCase() as Lowercase<typeof Web2Channels[0]>]
        ?.exists as boolean,
      available: app === MessagingApp.Discord ? !!discordGuildUrl && isSubscribeOnlyMode : true,
    }))
    .filter((app) => app.available);

  const handleUnsubscribe = () => {
    unsubscribe();
  };

  return (
    <Screen navbarActionComponent={!isSubscribeOnlyMode ? <NavbarActions /> : undefined} mb={1}>
      <Flex mt={!isSubscribeOnlyMode ? -5 : 0} mb={2}>
        <SettingsHeader icon={icon} />
      </Flex>
      <WrongNetworkError mb={2} />
      <ConnectApps apps={appConfig.map((config) => config.app)} />

      {!!messageCategories.length && <Preferences hideChannelInfo messagingApps={appConfig} />}

      {process.env.WHEREVER_ENV === 'development' && (
        <Flex width={'100%'} justifyContent={'center'} mb={1}>
          <Button variant={'outlined'} onClick={handleUnsubscribe} height={20}>
            Unsubscribe
          </Button>
        </Flex>
      )}
      <Notice text={`${name} doesn't have access to your info`} />
    </Screen>
  );
};
