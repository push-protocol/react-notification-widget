import React from 'react';
import ChannelDropdown from 'screens/settings/components/ChannelDropdown';
import { Discord as DiscordIcon } from 'components/icons';
import { useAuthContext } from 'context/AuthContext';
import useDiscordActions from 'screens/settings/channels/discord/useDiscordActions';
import ConnectedDiscord from 'screens/settings/channels/discord/components/ConnectedDiscord';
import IntegrateDiscord from 'screens/settings/channels/discord/components/IntegrateDiscord';

type DiscordChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const DiscordChannel = ({ open, setOpen }: DiscordChannelProps) => {
  const { isLoading } = useAuthContext();

  const { handleVerify, verifyLoading, deleteDiscordLoading, handleRemove, isConnected, hint } =
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
        <ConnectedDiscord
          hint={hint}
          handleRemove={handleRemove}
          isLoading={deleteDiscordLoading}
          isDisabled={deleteDiscordLoading || isLoading}
        />
      ) : (
        <IntegrateDiscord
          handleVerify={handleVerify}
          isLoading={verifyLoading}
          isDisabled={verifyLoading || isLoading}
        />
      )}
    </ChannelDropdown>
  );
};
