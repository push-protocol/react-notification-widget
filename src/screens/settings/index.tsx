import React, { useMemo } from 'react';
import { Screen } from 'components/layout/Screen';
import Button from 'components/Button';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import Channels from 'components/Channels';
import { useChannelContext } from 'context/ChannelContext';
import WrongNetworkError from 'components/Errors/WrongNetworkError';
import NavbarActions from 'screens/settings/components/NavbarActions';
import SettingsHeader from 'screens/settings/components/SettingsHeader';
import HiddenNotice from 'components/HiddenNotice';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import Preferences from 'components/Preferences';
import { useUserContext } from 'context/UserContext';
import { MessagingApp } from 'global/types.generated';
import { DefaultUserChannels } from 'context/UserContext/const';
import useDiscordActions from 'components/Channels/components/discord/useDiscordActions';

export const Settings = () => {
  const { isSubscribeOnly } = useEnvironment();
  const { userCommsChannels } = useUserContext();
  const { name, icon, discordGuildUrl } = useChannelContext();
  const { userPreferencesCount } = useUserContext();
  const { unsubscribe } = useAuthContext();
  const { isConnected } = useDiscordActions();

  const filteredUserPreferences = useMemo(() => {
    return (
      DefaultUserChannels.filter(
        (app) => userCommsChannels?.[app.toLowerCase() as 'telegram' | 'discord' | 'email'].exists
      )?.filter((app) => (!discordGuildUrl ? app !== MessagingApp.Discord : true)) || []
    );
  }, [discordGuildUrl, userCommsChannels]);

  const filteredConnectedChannels = useMemo(() => {
    return DefaultUserChannels.filter((channel) => {
      if (channel === MessagingApp.Discord) {
        return isConnected || discordGuildUrl;
      } else {
        return true;
      }
    });
  }, [discordGuildUrl, isConnected]);

  const handleUnsubscribe = () => {
    unsubscribe();
  };

  return (
    <Screen navbarActionComponent={!isSubscribeOnly ? <NavbarActions /> : undefined} mb={1}>
      <Flex mt={!isSubscribeOnly ? -3 : 0} mb={2}>
        <SettingsHeader
          title={
            isSubscribeOnly ? `You are subscribed to updates from ${name}` : 'Notification Settings'
          }
          icon={icon}
        />
      </Flex>
      <WrongNetworkError mb={2} />
      <Channels channels={filteredConnectedChannels} />
      {!!filteredUserPreferences.length && !!userPreferencesCount && (
        <Preferences hideChannelInfo userChannels={filteredUserPreferences} />
      )}
      {process.env.WHEREVER_ENV === 'development' && (
        <Flex width={'100%'} justifyContent={'center'} mb={1}>
          <Button variant={'outlined'} onClick={handleUnsubscribe} height={20}>
            <Text size={'sm'}>Unsubscribe</Text>
          </Button>
        </Flex>
      )}
      <HiddenNotice text={`${name} doesn't have access to your contact info`} />
    </Screen>
  );
};
