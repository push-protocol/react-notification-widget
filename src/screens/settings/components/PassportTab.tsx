import React, { useState } from 'react';
import { PersonFill as PersonIcon } from '@styled-icons/octicons/PersonFill';
import Flex from '../../../components/layout/Flex';
import Text from '../../../components/Text';
import Dropdown from '../../../components/Dropdown';
import Preferences from '../../../components/Preferences';
import ConnectApps from '../../../components/ConnectApps';
import Button from '../../../components/Button';
import WrongNetworkError from '../../../components/Errors/WrongNetworkError';
import { Web2Apps } from '../../../context/UserContext/const';
import { MessagingApp } from '../../../global/types.generated';
import { useUnsubscribeMutation } from '../operations.generated';
import { useAuthContext } from '../../../context/AuthContext';
import { useEnvironment } from '../../../context/EnvironmentContext';
import { useUserContext } from '../../../context/UserContext';
import { useChannelContext } from '../../../context/ChannelContext';
import useIsWrongNetwork from '../../../hooks/useIsWrongNetwork';

const PassportTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [openChannel, setOpenChannel] = useState(-1);
  const { isSubscribeOnlyMode } = useEnvironment();
  const { userCommsChannels } = useUserContext();
  const isWrongNetwork = useIsWrongNetwork();

  const { icon, discordGuildUrl, messageCategories, name } = useChannelContext();
  const { unsubscribe: signUnsubscribeMsg, logout, discordToken } = useAuthContext();

  const [unsubscribe] = useUnsubscribeMutation();

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
  const [appOpen, setAppOpen] = useState<MessagingApp | undefined>();

  return (
    <>
      {isSubscribeOnlyMode && (
        <Flex style={{ alignSelf: 'flex-start' }} m={2}>
          <Text size={'lg'}>
            <strong>Channels</strong>
          </Text>
        </Flex>
      )}

      {/*TODO: map something here*/}
      {isSubscribeOnlyMode ? (
        <Dropdown
          icon={icon}
          title={name}
          open={openChannel === 0}
          toggleOpen={() => setOpenChannel(openChannel === 0 ? -1 : 0)}
        >
          <Preferences
            hideChannelInfo
            hideDescriptions
            appConfig={appConfig}
            onDisabledAppClick={setAppOpen}
          />
        </Dropdown>
      ) : (
        !!messageCategories.length && (
          <Preferences
            hideChannelInfo
            hideDescriptions
            appConfig={appConfig}
            onDisabledAppClick={setAppOpen}
          />
        )
      )}

      {isSubscribeOnlyMode && (
        <Flex style={{ alignSelf: 'flex-start' }} mt={2} ml={2} mb={1}>
          <Text size={'lg'}>
            <strong>Destinations</strong>
          </Text>
        </Flex>
      )}

      <ConnectApps mt={1} apps={apps} appOpen={appOpen} setAppOpen={setAppOpen} />

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
    </>
  );
};

export default PassportTab;
