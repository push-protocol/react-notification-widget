import React from 'react';
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

export const Settings = () => {
  const { isSubscribeOnly } = useEnvironment();
  const { name } = useChannelContext();

  const { unsubscribe } = useAuthContext();

  const handleUnsubscribe = () => {
    unsubscribe();
  };

  return (
    <Screen navbarActionComponent={!isSubscribeOnly ? <NavbarActions /> : undefined} mb={1}>
      <SettingsHeader />
      <WrongNetworkError mb={2} />
      <Channels />
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
