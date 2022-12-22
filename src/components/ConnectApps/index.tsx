import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context/UserContext';
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

const ConnectApps = ({ apps }: { apps: MessagingApp[] }) => {
  const { isWrongNetwork } = useChannelContext();
  const { isOnboarding, isLoggedIn } = useAuthContext();

  const [channelOpen, setChannelOpen] = useState<MessagingApp | undefined>(
    isOnboarding ? apps?.[0] : undefined
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
      {apps.map((channel) => channelComponents[channel])}
    </ChannelsContainer>
  );
};

export default ConnectApps;
