import React from 'react';
import ChannelDropdown from 'screens/settings/components/ChannelDropdown';
import { Discord as DiscordIcon } from 'components/icons';
import { useAuthContext } from 'context/AuthContext';
import useDiscordActions from 'screens/settings/channels/discord/useDiscordActions';
import ConnectedChannel from 'screens/settings/components/ConnectedChannel';

type DiscordChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const DiscordChannel = ({ open, setOpen }: DiscordChannelProps) => {
  const { isLoading } = useAuthContext();

  const { deleteDiscordLoading, handleRemove, isConnected, hint } = useDiscordActions();

  return (
    <ChannelDropdown
      title={'Discord'}
      icon={<DiscordIcon />}
      isConnected={isConnected}
      open={open}
      setOpen={setOpen}
    >
      <ConnectedChannel
        description={
          hint ? `You are receiving alerts to ${hint}` : 'You Discord account is connected'
        }
        handleRemove={handleRemove}
        isLoading={deleteDiscordLoading}
        isDisabled={deleteDiscordLoading || isLoading}
      />
    </ChannelDropdown>
  );
};
