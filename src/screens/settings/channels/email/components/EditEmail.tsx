import React from 'react';
import TextInput from 'components/TextInput';
import Flex from 'components/layout/Flex';
import { UserCommunicationChannel } from 'global/types.generated';
import Button from 'components/Button';
import isEmailValid from 'helpers/functions/isEmailValid';
import Spinner from 'components/Spinner';

type EditEmailProps = {
  value: string;
  onChange(value: string): void;
  handleSave: () => void;
  handleEdit: (edit: boolean) => void;
  isLoading: boolean;
  isDisabled: boolean;
  email?: UserCommunicationChannel;
  isConnected?: boolean;
};

const EditEmail = ({
  value,
  onChange,
  handleSave,
  handleEdit,
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
        <Button variant="text" onClick={() => handleEdit(false)} size={'md'}>
          Cancel
        </Button>
      )}
      <Button
        disabled={!isEmailValid(value) || isDisabled}
        size={'lg'}
        onClick={handleSave}
        width={96}
      >
        {isLoading ? <Spinner size={15} /> : 'Next'}
      </Button>
    </Flex>
  </Flex>
);

export default EditEmail;
