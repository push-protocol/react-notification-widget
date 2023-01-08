import React, { useState } from 'react';
import { ENV } from '../../global/const';
import Notice from 'components/Notice';
import { Screen } from 'components/layout/Screen';
import Button from 'components/Button';
import Flex from 'components/layout/Flex';
import ConnectApps from 'components/ConnectApps';
import { useChannelContext } from 'context/ChannelContext';
import NavbarActions from 'screens/settings/components/NavbarActions';
import SettingsHeader from 'screens/settings/components/SettingsHeader';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import Preferences from 'components/Preferences';
import { useUserContext } from 'context/UserContext';
import { MessagingApp } from 'global/types.generated';
import { Web2Apps } from 'context/UserContext/const';

export const Settings = () => {
  const { isSubscribeOnlyMode } = useEnvironment();
  const { userCommsChannels } = useUserContext();
  const { name, icon, discordGuildUrl, messageCategories } = useChannelContext();
  const { unsubscribe, isOnboarding, logout, discordToken } = useAuthContext();

  const appConfig = Web2Apps.map((app) => ({
    app,
    enabled: userCommsChannels?.[app.toLowerCase() as Lowercase<typeof Web2Apps[0]>]
      ?.exists as boolean,
    available:
      app === MessagingApp.Discord
        ? (!!discordGuildUrl && discordToken) || userCommsChannels?.discord.exists
        : true,
  })).filter((app) => app.available);

  const handleUnsubscribe = () => {
    unsubscribe();
  };

  const apps = appConfig.map((config) => config.app);
  const [appOpen, setAppOpen] = useState<MessagingApp | undefined>(
    isOnboarding ? apps?.[0] : undefined
  );

  return (
    <Screen navbarActionComponent={!isSubscribeOnlyMode ? <NavbarActions /> : undefined} mb={1}>
      <Flex mt={!isSubscribeOnlyMode ? -5 : 0} mb={2}>
        <SettingsHeader icon={icon} />
      </Flex>
      {!!messageCategories.length && (
        <Preferences
          hideChannelInfo
          hideDescriptions
          appConfig={appConfig}
          onDisabledAppClick={setAppOpen}
        />
      )}

      <ConnectApps apps={apps} appOpen={appOpen} setAppOpen={setAppOpen} />

      {ENV === 'development' && (
        <Flex width={'100%'} justifyContent={'center'} mb={1}>
          <Button variant={'outlined'} onClick={handleUnsubscribe} height={20}>
            Unsubscribe
          </Button>
        </Flex>
      )}
      <Notice text={`${name} doesn't have access to your info`} />

      {isSubscribeOnlyMode && (
        <Flex width={'100%'} justifyContent={'center'} mb={1} mt={2}>
          <Button variant={'outlined'} onClick={logout}>
            Disconnect
          </Button>
        </Flex>
      )}
    </Screen>
  );
};
