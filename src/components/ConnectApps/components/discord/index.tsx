import React from 'react';
import AppDropdown from '../AppDropdown';
import ConnectedApp from '../ConnectedApp';
import Flex from '../../../layout/Flex';
import Text from '../../../Text';
import useDiscordActions from './useDiscordActions';
import { useUserContext } from 'context/UserContext';
import { Discord as DiscordIcon } from 'components/icons';
import { useAuthContext } from 'context/AuthContext';

type DiscordChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const DiscordConnector = ({ open, setOpen }: DiscordChannelProps) => {
  const { isLoading } = useAuthContext();
  const { userCommsChannels } = useUserContext();

  const { deleteLoading, handleRemove, verifyData, hint } = useDiscordActions();

  const isConnected = userCommsChannels?.discord.exists;

  return (
    <AppDropdown
      title={'Discord'}
      isLoading={verifyData.loading}
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
        <Flex direction={'column'} width={'100%'} gap={2}>
          <Text>
            {verifyData.loading && 'Verifying your account...'}
            {verifyData.error && 'Something went wrong. Please try to reconnect through Discord.'}
          </Text>
        </Flex>
      )}
    </AppDropdown>
  );
};
