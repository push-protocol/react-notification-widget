import React, { useEffect, useState } from 'react';
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
import { useNotificationsContext } from 'context/NotificationsContext';
import { MessagingApp } from 'global/types.generated';
import { defaultUserChannels } from 'context/ChannelContext/usePreferenceActions';

export const Settings = () => {
  const { isSubscribeOnly } = useEnvironment();
  const { userCommsChannels } = useNotificationsContext();
  const { name, icon, discordGuildUrl } = useChannelContext();

  const [userChannels, setUserChannels] = useState(defaultUserChannels);

  useEffect(() => {
    setUserChannels(
      userChannels.filter((channel) => (!discordGuildUrl ? channel !== MessagingApp.Discord : true))
    );
  }, [discordGuildUrl]);

  useEffect(() => {
    if (!setUserChannels) return;
    const userChannelsMap: { [key: string]: boolean } = {
      [MessagingApp.Discord]: !!userCommsChannels?.discord?.exists,
      [MessagingApp.Email]: !!userCommsChannels?.email?.exists,
      [MessagingApp.Telegram]: !!userCommsChannels?.telegram?.exists,
    };

    const channelKeys: string[] = Object.keys(userChannelsMap);

    setUserChannels(
      channelKeys.filter((key: string) => {
        return userChannelsMap[key];
      }) as MessagingApp[]
    );

    return () => setUserChannels(defaultUserChannels);
  }, [userCommsChannels, setUserChannels]);

  const { unsubscribe } = useAuthContext();

  const handleUnsubscribe = () => {
    unsubscribe();
  };

  return (
    <Screen navbarActionComponent={!isSubscribeOnly ? <NavbarActions /> : undefined} mb={1}>
      <Flex mt={!isSubscribeOnly ? -3 : 0} mb={2}>
        <SettingsHeader
          title={isSubscribeOnly ? `You are subscriberd to ${name}` : 'Notification Settings'}
          icon={icon}
        />
      </Flex>
      <WrongNetworkError mb={2} />
      <Channels showDiscord={true} showEmail={true} showTelegram={true} />
      {userChannels.length > 0 && (
        <Preferences hideChannelInfo={true} userChannels={userChannels} />
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
