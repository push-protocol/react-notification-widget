import React from 'react';
import { Discord as DiscordIcon } from 'components/icons';
import { useAuthContext } from 'context/AuthContext';
import IntegrateDiscord from 'components/Channels/discord/components/IntegrateDiscord';
import useDiscordActions from 'components/Channels/discord/useDiscordActions';
import ChannelDropdown from 'components/Channels/ChannelDropdown';
import ConnectedChannel from 'components/Channels/ConnectedChannel';

type DiscordChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const DiscordChannel = ({ open, setOpen }: DiscordChannelProps) => {
  const { isLoading } = useAuthContext();

  const { deleteLoading, handleRemove, handleOpenDiscord, isConnected, hint } = useDiscordActions();

  return (
    <ChannelDropdown
      title={'Discord'}
      icon={<DiscordIcon />}
      isConnected={isConnected}
      open={open}
      setOpen={setOpen}
    >
      {isConnected ? (
        <ConnectedChannel
          description={
            hint ? `You are receiving alerts to ${hint}` : 'Your Discord account is connected'
          }
          handleRemove={handleRemove}
          isLoading={deleteLoading}
          isDisabled={deleteLoading || isLoading}
        />
      ) : (
        <IntegrateDiscord onOpenDiscord={handleOpenDiscord} />
      )}
    </ChannelDropdown>
  );
};
