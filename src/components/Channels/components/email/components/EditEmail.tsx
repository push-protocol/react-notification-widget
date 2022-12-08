import React from 'react';
import TextInput from 'components/TextInput';
import Flex from 'components/layout/Flex';
import { UserCommunicationChannel } from 'global/types.generated';
import Button from 'components/Button';
import isEmailValid from 'helpers/functions/isEmailValid';

type EditEmailProps = {
  value: string;
  onChange(value: string): void;
  handleSave: () => void;
  handleCancel: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  email?: UserCommunicationChannel;
  isConnected?: boolean;
};

const EditEmail = ({
  value,
  onChange,
  handleSave,
  handleCancel,
  isLoading,
  isDisabled,
  isConnected,
}: EditEmailProps) => (
  <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} width={'100%'} gap={1}>
    <TextInput
      placeholder={'email@example.com'}
      value={value}
      onValueChange={(value) => onChange(value)}
    />
    <Flex
      justifyContent={isConnected ? 'space-between' : 'end'}
      alignItems={'center'}
      width={'100%'}
    >
      {isConnected && (
        <Button variant="text" onClick={handleCancel} size={'md'}>
          Cancel
        </Button>
      )}
      <Button
        disabled={!isEmailValid(value) || isDisabled}
        isLoading={isLoading}
        onClick={handleSave}
      >
        Next
      </Button>
    </Flex>
  </Flex>
);

export default EditEmail;
