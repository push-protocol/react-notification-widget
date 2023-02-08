import React, { ReactElement } from 'react';
import Flex from '../layout/Flex';
import { DiscordConnector } from './components/discord';
import { EmailConnector } from './components/email';
import { TelegramConnector } from './components/telegram';
import { MessagingApp } from 'global/types.generated';

const ConnectApps = ({
  apps,
  appOpen,
  setAppOpen,
}: {
  apps: MessagingApp[];
  appOpen?: MessagingApp;
  setAppOpen: (open?: MessagingApp) => void;
}) => {
  const toggleChannelOpen = (channel: MessagingApp) => {
    appOpen === channel ? setAppOpen(undefined) : setAppOpen(channel);
  };

  const appConnectors: { [key in MessagingApp]?: ReactElement } = {
    [MessagingApp.Discord]: (
      <DiscordConnector
        key={MessagingApp.Discord}
        open={appOpen === MessagingApp.Discord}
        toggleOpen={() => toggleChannelOpen(MessagingApp.Discord)}
      />
    ),
    [MessagingApp.Email]: (
      <EmailConnector
        key={MessagingApp.Email}
        open={appOpen === MessagingApp.Email}
        toggleOpen={() => toggleChannelOpen(MessagingApp.Email)}
      />
    ),
    [MessagingApp.Telegram]: (
      <TelegramConnector
        key={MessagingApp.Telegram}
        open={appOpen === MessagingApp.Telegram}
        toggleOpen={() => toggleChannelOpen(MessagingApp.Telegram)}
      />
    ),
  };

  return (
    <Flex gap={1} width={'100%'} direction={'column'}>
      {apps.map((app) => appConnectors[app])}
    </Flex>
  );
};

export default ConnectApps;
