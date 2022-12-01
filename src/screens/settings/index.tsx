import React from 'react';
import styled from 'styled-components';
import { Screen } from 'components/layout/Screen';
import Button from 'components/Button';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import { EmailChannel, TelegramChannel } from 'screens/settings/channels';
import HiddenNotice from 'screens/settings/components/HiddenNotice';
import { useChannelContext } from 'context/ChannelContext';
import WrongNetworkError from 'components/Errors/WrongNetworkError';
import NavbarActions from 'screens/settings/components/NavbarActions';
import SettingsHeader from 'screens/settings/components/SettingsHeader';
import useSettingsActions, { Channels } from 'screens/settings/useSettingsActions';
import { DiscordChannel } from 'screens/settings/channels/discord';
import useDiscordActions from 'screens/settings/channels/discord/useDiscordActions';

const ChannelsContainer = styled(Flex)<{ wrongNetwork?: boolean }>`
  ${({ wrongNetwork }) =>
    wrongNetwork &&
    `
    pointer-events: none;
  `}
`;

export enum SettingsViews {
  DEFAULT = 'DEFAULT',
  ONBOARDING = 'ONBOARDING',
  SUBSCRIBE_ONLY = 'SUBSCRIBE_ONLY',
  SUBSCRIBE_ONLY_COMPLETED = 'SUBSCRIBE_ONLY_COMPLETED',
}

export const Settings = () => {
  const { isWrongNetwork } = useChannelContext();
  const { isConnected } = useDiscordActions();
  const {
    channelOpen,
    toggleChannelOpen,
    view,
    renderFinalizeButton,
    handleUnsubscribe,
    handleFinalizeSubscription,
  } = useSettingsActions();

  return (
    <Screen navbarActionComponent={<NavbarActions view={view} />} mb={1}>
      <SettingsHeader view={view} />
      <WrongNetworkError mb={2} />
      <ChannelsContainer
        wrongNetwork={isWrongNetwork}
        gap={1}
        width={'100%'}
        direction={'column'}
        mb={2}
      >
        {isConnected && ( // this is temporary check until there is integration flow from widget
          <DiscordChannel
            open={channelOpen === Channels.DISCORD}
            setOpen={() => toggleChannelOpen(Channels.DISCORD)}
          />
        )}
        <EmailChannel
          open={channelOpen === Channels.EMAIL}
          setOpen={() => toggleChannelOpen(Channels.EMAIL)}
        />
        <TelegramChannel
          open={channelOpen === Channels.TELEGRAM}
          setOpen={() => toggleChannelOpen(Channels.TELEGRAM)}
        />
      </ChannelsContainer>
      {renderFinalizeButton && (
        <Flex width={'100%'} justifyContent={'center'}>
          <Button onClick={handleFinalizeSubscription} height={20}>
            <Text>Finish</Text>
          </Button>
        </Flex>
      )}
      {process.env.WHEREVER_ENV === 'development' && (
        <Flex width={'100%'} justifyContent={'center'}>
          <Button variant={'outlined'} onClick={handleUnsubscribe} height={20}>
            <Text size={'sm'}>Unsubscribe</Text>
          </Button>
        </Flex>
      )}
      <HiddenNotice view={view} />
    </Screen>
  );
};
