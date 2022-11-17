import React from 'react';
import Flex from 'components/layout/Flex';
import ChannelDropdown from 'screens/settings/components/ChannelDropdown';
import { Email as EmailIcon } from 'components/icons';
import useEmailActions from 'screens/settings/channels/email/useEmailActions';
import EditEmailView from 'screens/settings/channels/email/components/EditEmailView';
import VerifyEmailView from 'screens/settings/channels/email/components/VerifyEmailView';
import ConnectedEmailView from 'screens/settings/channels/email/components/ConnectedEmailView';
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
    isEditing,
    isVerify,
    handleSave,
    handleVerify,
    handleRemove,
    setIsEditing,
    saveLoading,
    verifyLoading,
    deleteLoading,
    exists,
    hint,
  } = useEmailActions();

  return (
    <ChannelDropdown
      title={'Email'}
      icon={<EmailIcon />}
      open={open}
      setOpen={setOpen}
      connected={!!exists}
    >
      <Flex width={'100%'}>
        {isEditing && isVerify && (
          <VerifyEmailView
            email={email}
            handleVerify={handleVerify}
            isLoading={verifyLoading || isLoading}
          />
        )}
        {isEditing && !isVerify && (
          <EditEmailView
            value={email}
            onChange={setEmail}
            handleSave={handleSave}
            handleEdit={setIsEditing}
            isLoading={saveLoading || isLoading}
            exists={exists}
          />
        )}
        {!isEditing && (
          <ConnectedEmailView
            hint={hint}
            handleRemove={handleRemove}
            handleEdit={() => setIsEditing(true)}
            isLoading={deleteLoading || isLoading}
          />
        )}
      </Flex>
    </ChannelDropdown>
  );
};
