import React from 'react';
import AppDropdown from '../AppDropdown';
import ConnectedApp from '../ConnectedApp';
import { useUserContext } from '../../../../context/UserContext';
import IntegrateDiscord from './IntegrateDiscord';
import useDiscordActions from './useDiscordActions';
import { Discord as DiscordIcon } from 'components/icons';
import { useAuthContext } from 'context/AuthContext';

type DiscordChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const DiscordConnector = ({ open, setOpen }: DiscordChannelProps) => {
  const { isLoading } = useAuthContext();
  const { userCommsChannels } = useUserContext();

  const { deleteLoading, handleRemove, handleOpenDiscord, hint } = useDiscordActions();

  const isConnected = userCommsChannels?.discord.exists;

  return (
    <AppDropdown
      title={'Discord'}
      icon={<DiscordIcon />}
      isConnected={isConnected}
      open={open}
      setOpen={setOpen}
    >
      {isConnected ? (
        <ConnectedApp
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
    </AppDropdown>
  );
};
