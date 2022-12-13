import React from 'react';
import ChannelDropdown from '../ChannelDropdown';
import ConnectedChannel from '../ConnectedChannel';
import VerifyEmail from './VerifyEmail';
import EditEmail from './EditEmail';
import useEmailActions, { ConnectEmailViews } from './useEmailActions';
import { useAuthContext } from 'context/AuthContext';
import { Email as EmailIcon } from 'components/icons';
import Flex from 'components/layout/Flex';

type EmailChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const EmailChannel = ({ open, setOpen }: EmailChannelProps) => {
  const { isLoading } = useAuthContext();

  const {
    email,
    setEmail,
    handleSave,
    handleVerify,
    handleRemove,
    connectEmailView,
    setConnectEmailView,
    saveLoading,
    verifyLoading,
    deleteLoading,
    isConnected,
    hint,
  } = useEmailActions();

  return (
    <ChannelDropdown
      title={'Email'}
      icon={<EmailIcon />}
      open={open}
      setOpen={setOpen}
      isConnected={!!isConnected}
    >
      <Flex width={'100%'}>
        {connectEmailView === ConnectEmailViews.Verify && (
          <VerifyEmail
            email={email}
            handleVerify={handleVerify}
            handleEdit={() => setConnectEmailView(ConnectEmailViews.Edit)}
            isLoading={verifyLoading}
            isDisabled={verifyLoading || isLoading}
          />
        )}
        {connectEmailView === ConnectEmailViews.Edit && (
          <EditEmail
            value={email}
            onChange={setEmail}
            handleSave={handleSave}
            handleCancel={() => setConnectEmailView(ConnectEmailViews.Connected)}
            isLoading={saveLoading}
            isDisabled={saveLoading || isLoading}
            isConnected={isConnected}
          />
        )}
        {connectEmailView === ConnectEmailViews.Connected && (
          <ConnectedChannel
            description={`You are receiving alerts to ${hint}`}
            handleRemove={handleRemove}
            handleEdit={() => setConnectEmailView(ConnectEmailViews.Edit)}
            isLoading={deleteLoading}
            isDisabled={deleteLoading || isLoading}
          />
        )}
      </Flex>
    </ChannelDropdown>
  );
};
