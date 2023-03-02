import React from 'react';
import { Discord as DiscordIcon } from '../../../icons';
import Dropdown from '../../../Dropdown';
import ConnectedApp from '../ConnectedApp';
import Flex from '../../../layout/Flex';
import Text from '../../../Text';
import useDiscordActions from './useDiscordActions';
import { useUserContext } from 'context/UserContext';
import { useAuthContext } from 'context/AuthContext';

type DiscordChannelProps = {
  open: boolean;
  toggleOpen: () => void;
};

export const DiscordConnector = ({ open, toggleOpen }: DiscordChannelProps) => {
  const { isLoading } = useAuthContext();
  const { userCommsChannels } = useUserContext();

  const { deleteLoading, handleRemove, verifyData, hint } = useDiscordActions();

  const isConnected = userCommsChannels?.discord.exists;

  return (
    <Dropdown
      title={'Discord'}
      isLoading={verifyData.loading}
      icon={<DiscordIcon />}
      isConnected={isConnected}
      isOpen={open}
      toggleOpen={toggleOpen}
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
        <Flex direction={'column'} width={'100%'} gap={2}>
          <Text>
            {verifyData.loading && 'Verifying your account...'}
            {verifyData.error && 'Something went wrong. Please try to reconnect through Discord.'}
          </Text>
        </Flex>
      )}
    </Dropdown>
  );
};
