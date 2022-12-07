import React, { useState } from 'react';
import styled from 'styled-components';
import { DiscordChannel } from 'components/Channels/discord';
import { MessagingApp } from 'global/types.generated';
import { EmailChannel } from 'components/Channels/email';
import { TelegramChannel } from 'components/Channels/telegram';
import { useAuthContext } from 'context/AuthContext';
import { useChannelContext } from 'context/ChannelContext';
import Flex from 'components/layout/Flex';

const ChannelsContainer = styled(Flex)<{ wrongNetwork?: boolean }>`
  ${({ wrongNetwork }) =>
    wrongNetwork &&
    `
    pointer-events: none;
  `}
`;

const Channels = () => {
  const { isWrongNetwork } = useChannelContext();
  const { isOnboarding } = useAuthContext();

  const [channelOpen, setChannelOpen] = useState<MessagingApp | undefined>(
    isOnboarding ? MessagingApp.Email : undefined
  );

  const toggleChannelOpen = (channel: MessagingApp) => {
    if (isWrongNetwork) return;
    channelOpen === channel ? setChannelOpen(undefined) : setChannelOpen(channel);
  };

  return (
    <ChannelsContainer
      wrongNetwork={isWrongNetwork}
      gap={1}
      width={'100%'}
      direction={'column'}
      mb={2}
    >
      <DiscordChannel
        open={channelOpen === MessagingApp.Discord}
        setOpen={() => toggleChannelOpen(MessagingApp.Discord)}
      />
      <EmailChannel
        open={channelOpen === MessagingApp.Email}
        setOpen={() => toggleChannelOpen(MessagingApp.Email)}
      />
      <TelegramChannel
        open={channelOpen === MessagingApp.Telegram}
        setOpen={() => toggleChannelOpen(MessagingApp.Telegram)}
      />
    </ChannelsContainer>
  );
};

export default Channels;
