import React, { ReactNode, useState } from 'react';
import { DiscordChannel } from './components/discord';
import { EmailChannel } from './components/email';
import { TelegramChannel } from './components/telegram';
import { MessagingApp } from 'global/types.generated';
import { useAuthContext } from 'context/AuthContext';
import Flex from 'components/layout/Flex';

const ConnectApps = ({ apps }: { apps: MessagingApp[] }) => {
  const { isOnboarding } = useAuthContext();

  const [channelOpen, setChannelOpen] = useState<MessagingApp | undefined>(
    isOnboarding ? apps?.[0] : undefined
  );

  const toggleChannelOpen = (channel: MessagingApp) => {
    channelOpen === channel ? setChannelOpen(undefined) : setChannelOpen(channel);
  };

  const channelComponents: { [key in MessagingApp]?: ReactNode } = {
    [MessagingApp.Discord]: (
      <DiscordChannel
        key={MessagingApp.Discord}
        open={channelOpen === MessagingApp.Discord}
        setOpen={() => toggleChannelOpen(MessagingApp.Discord)}
      />
    ),
    [MessagingApp.Email]: (
      <EmailChannel
        key={MessagingApp.Email}
        open={channelOpen === MessagingApp.Email}
        setOpen={() => toggleChannelOpen(MessagingApp.Email)}
      />
    ),
    [MessagingApp.Telegram]: (
      <TelegramChannel
        key={MessagingApp.Telegram}
        open={channelOpen === MessagingApp.Telegram}
        setOpen={() => toggleChannelOpen(MessagingApp.Telegram)}
      />
    ),
  };

  return (
    <Flex gap={1} width={'100%'} direction={'column'} mb={2}>
      {apps.map((channel) => channelComponents[channel])}
    </Flex>
  );
};

export default ConnectApps;
