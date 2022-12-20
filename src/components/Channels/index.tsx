import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import useDiscordActions from './components/discord/useDiscordActions';
import { DiscordChannel } from './components/discord';
import { EmailChannel } from './components/email';
import { TelegramChannel } from './components/telegram';
import { MessagingApp } from 'global/types.generated';
import { useAuthContext } from 'context/AuthContext';
import { useChannelContext } from 'context/ChannelContext';
import Flex from 'components/layout/Flex';

const ChannelsContainer = styled(Flex)<{ disablePointerEvents?: boolean }>`
  ${({ disablePointerEvents }) =>
    disablePointerEvents &&
    `
    pointer-events: none;
  `}
`;

const Channels = ({ channels }: { channels: MessagingApp[] }) => {
  const { isWrongNetwork, discordGuildUrl } = useChannelContext();
  const { isOnboarding, isLoggedIn } = useAuthContext();
  const { isConnected } = useDiscordActions();

  const [channelOpen, setChannelOpen] = useState<MessagingApp | undefined>(
    isOnboarding ? channels?.[0] : undefined
  );

  const toggleChannelOpen = (channel: MessagingApp) => {
    if (isWrongNetwork) return;
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
    <ChannelsContainer
      disablePointerEvents={isWrongNetwork && !isLoggedIn}
      gap={1}
      width={'100%'}
      direction={'column'}
      mb={2}
    >
      {channels.map((channel) => channelComponents[channel])}
      {(isConnected || discordGuildUrl) && (
        <DiscordChannel
          open={channelOpen === MessagingApp.Discord}
          setOpen={() => toggleChannelOpen(MessagingApp.Discord)}
        />
      )}
    </ChannelsContainer>
  );
};

export default Channels;
