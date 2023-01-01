import React, { useState, ReactElement } from 'react';
import { DiscordConnector } from './components/discord';
import { EmailConnector } from './components/email';
import { TelegramConnector } from './components/telegram';
import { MessagingApp } from 'global/types.generated';
import { useAuthContext } from 'context/AuthContext';
import Flex from 'components/layout/Flex';

const ConnectApps = ({ apps }: { apps: MessagingApp[] }) => {
  const { isOnboarding } = useAuthContext();

  const [appOpen, setAppOpen] = useState<MessagingApp | undefined>(
    isOnboarding ? apps?.[0] : undefined
  );

  const toggleChannelOpen = (channel: MessagingApp) => {
    appOpen === channel ? setAppOpen(undefined) : setAppOpen(channel);
  };

  const appConnectors: { [key in MessagingApp]?: ReactElement } = {
    [MessagingApp.Discord]: (
      <DiscordConnector
        key={MessagingApp.Discord}
        open={appOpen === MessagingApp.Discord}
        setOpen={() => toggleChannelOpen(MessagingApp.Discord)}
      />
    ),
    [MessagingApp.Email]: (
      <EmailConnector
        key={MessagingApp.Email}
        open={appOpen === MessagingApp.Email}
        setOpen={() => toggleChannelOpen(MessagingApp.Email)}
      />
    ),
    [MessagingApp.Telegram]: (
      <TelegramConnector
        key={MessagingApp.Telegram}
        open={appOpen === MessagingApp.Telegram}
        setOpen={() => toggleChannelOpen(MessagingApp.Telegram)}
      />
    ),
  };

  return (
    <Flex gap={1} width={'100%'} direction={'column'} mb={2}>
      {apps.map((app) => appConnectors[app])}
    </Flex>
  );
};

export default ConnectApps;
