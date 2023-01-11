import React, { useState } from 'react';
import { PersonFill as PersonIcon } from '@styled-icons/octicons';
import Dropdown from '../../components/Dropdown';
import Text from '../../components/Text';
import WrongNetworkError from '../../components/Errors/WrongNetworkError';
import useIsWrongNetwork from '../../hooks/useIsWrongNetwork';
import { useUnsubscribeMutation } from './operations.generated';
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
  const { icon, discordGuildUrl, messageCategories } = useChannelContext();
  const { unsubscribe: signUnsubscribeMsg, isOnboarding, logout, discordToken } = useAuthContext();
  const isWrongNetwork = useIsWrongNetwork();

  const [unsubscribe] = useUnsubscribeMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const appConfig = Web2Apps.map((app) => ({
    app,
    enabled: userCommsChannels?.[app.toLowerCase() as Lowercase<typeof Web2Apps[0]>]
      ?.exists as boolean,
    available:
      app === MessagingApp.Discord
        ? (!!discordGuildUrl && discordToken) || userCommsChannels?.discord.exists
        : true,
  })).filter((app) => app.available);

  const handleUnsubscribe = async () => {
    setIsLoading(true);

    try {
      await signUnsubscribeMsg();
      await unsubscribe();
    } finally {
      setIsLoading(false);
    }
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

      <Flex mt={1} mb={1} width={'100%'}>
        <Dropdown
          open={accountMenuOpen}
          toggleOpen={() => setAccountMenuOpen(!accountMenuOpen)}
          title={'Account'}
          icon={<PersonIcon />}
        >
          <Flex width={'100%'} direction={'column'} gap={2}>
            <Text>Sign a message with your wallet to unsubscribe from all communication</Text>
            <Button
              disabled={isWrongNetwork}
              isLoading={isLoading}
              variant={'gray'}
              onClick={handleUnsubscribe}
            >
              Unsubscribe
            </Button>
            {isWrongNetwork && <WrongNetworkError action={'unsubscribe'} />}
          </Flex>
        </Dropdown>
      </Flex>

      {isSubscribeOnlyMode && (
        <Button mt={1} mb={2} variant={'gray'} onClick={logout}>
          Disconnect Wallet
        </Button>
      )}
    </Screen>
  );
};
