import React from 'react';
import Flex from 'components/layout/Flex';
import ChannelDropdown from 'screens/settings/components/ChannelDropdown';
import { Email as EmailIcon } from 'components/icons';
import useEmailActions from 'screens/settings/channels/email/useEmailActions';
import EditEmail from 'screens/settings/channels/email/components/EditEmail';
import VerifyEmail from 'screens/settings/channels/email/components/VerifyEmail';
import ConnectedEmail from 'screens/settings/channels/email/components/ConnectedEmail';
import { useAuthContext } from 'context/AuthContext';

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
    setIsEditing,
    saveLoading,
    verifyLoading,
    deleteLoading,
    renderVerify,
    renderEdit,
    renderConnected,
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
        {renderVerify && (
          <VerifyEmail
            email={email}
            handleVerify={handleVerify}
            isLoading={verifyLoading}
            isDisabled={verifyLoading || isLoading}
          />
        )}
        {renderEdit && (
          <EditEmail
            value={email}
            onChange={setEmail}
            handleSave={handleSave}
            handleEdit={setIsEditing}
            isLoading={saveLoading}
            isDisabled={saveLoading || isLoading}
            isConnected={isConnected}
          />
        )}
        {renderConnected && (
          <ConnectedEmail
            hint={hint}
            handleRemove={handleRemove}
            handleEdit={() => setIsEditing(true)}
            isLoading={deleteLoading}
            isDisabled={deleteLoading || isLoading}
          />
        )}
      </Flex>
    </ChannelDropdown>
  );
};
