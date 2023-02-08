import React from 'react';
import { Email as EmailIcon } from '../../../icons';
import Dropdown from '../../../Dropdown';
import ConnectedApp from '../ConnectedApp';
import Flex from '../../../layout/Flex';
import VerifyEmail from './VerifyEmail';
import EditEmail from './EditEmail';
import useEmailActions, { ConnectEmailViews } from './useEmailActions';
import { useAuthContext } from 'context/AuthContext';

type EmailChannelProps = {
  open: boolean;
  toggleOpen: () => void;
};

export const EmailConnector = ({ open, toggleOpen }: EmailChannelProps) => {
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
    <Dropdown
      title={'Email'}
      icon={<EmailIcon />}
      open={open}
      toggleOpen={toggleOpen}
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
          <ConnectedApp
            description={`You are receiving alerts to ${hint}`}
            handleRemove={handleRemove}
            handleEdit={() => setConnectEmailView(ConnectEmailViews.Edit)}
            isLoading={deleteLoading}
            isDisabled={deleteLoading || isLoading}
          />
        )}
      </Flex>
    </Dropdown>
  );
};
