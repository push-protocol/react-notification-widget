import React, { useState } from 'react';
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

const Channels = ({
  showDiscord,
  showTelegram,
  showEmail,
}: {
  showDiscord?: boolean;
  showTelegram?: boolean;
  showEmail?: boolean;
}) => {
  const { isWrongNetwork } = useChannelContext();
  const { isOnboarding, isLoggedIn } = useAuthContext();
  const { discordGuildUrl, isConnected } = useDiscordActions();

  const [channelOpen, setChannelOpen] = useState<MessagingApp | undefined>(
    isOnboarding ? MessagingApp.Email : undefined
  );

  const toggleChannelOpen = (channel: MessagingApp) => {
    if (isWrongNetwork) return;
    channelOpen === channel ? setChannelOpen(undefined) : setChannelOpen(channel);
  };

  return (
    <ChannelsContainer
      disablePointerEvents={isWrongNetwork && !isLoggedIn}
      gap={1}
      width={'100%'}
      direction={'column'}
      mb={2}
    >
      {showDiscord && (isConnected || discordGuildUrl) && (
        <DiscordChannel
          open={channelOpen === MessagingApp.Discord}
          setOpen={() => toggleChannelOpen(MessagingApp.Discord)}
        />
      )}
      {showEmail && (
        <EmailChannel
          open={channelOpen === MessagingApp.Email}
          setOpen={() => toggleChannelOpen(MessagingApp.Email)}
        />
      )}
      {showTelegram && (
        <TelegramChannel
          open={channelOpen === MessagingApp.Telegram}
          setOpen={() => toggleChannelOpen(MessagingApp.Telegram)}
        />
      )}
    </ChannelsContainer>
  );
};

export default Channels;
