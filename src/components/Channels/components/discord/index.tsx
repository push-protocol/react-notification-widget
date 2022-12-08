import React from 'react';
import ChannelDropdown from '../ChannelDropdown';
import ConnectedChannel from '../ConnectedChannel';
import IntegrateDiscord from './components/IntegrateDiscord';
import useDiscordActions from './useDiscordActions';
import { Discord as DiscordIcon } from 'components/icons';
import { useAuthContext } from 'context/AuthContext';

type DiscordChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const DiscordChannel = ({ open, setOpen }: DiscordChannelProps) => {
  const { isLoading } = useAuthContext();

  const { deleteLoading, handleRemove, handleOpenDiscord, discordGuildUrl, isConnected, hint } =
    useDiscordActions();

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
