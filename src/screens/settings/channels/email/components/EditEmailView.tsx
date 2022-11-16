import React from 'react';
import TextInput from 'components/TextInput';
import Flex from 'components/layout/Flex';
import { UserCommunicationChannel } from 'global/types.generated';
import Button from 'components/Button';
import isEmailValid from 'helpers/functions/isEmailValid';
import Spinner from 'components/Spinner';
import TextLink from 'components/TextLink';

type EditEmailViewProps = {
  value: string;
  onChange(value: string): void;
  handleSave: () => void;
  handleEdit: (edit: boolean) => void;
  isLoading: boolean;
  email?: UserCommunicationChannel;
  exists?: boolean;
};

const EditEmailView = ({
  value,
  onChange,
  handleSave,
  handleEdit,
  isLoading,
  exists,
}: EditEmailViewProps) => (
  <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} width={'100%'} gap={1}>
    <TextInput
      placeholder={'email@example.com'}
      value={value}
      onValueChange={(value) => onChange(value)}
    />
    <Flex justifyContent={exists ? 'space-between' : 'end'} alignItems={'center'} width={'100%'}>
      {exists && <TextLink onClick={() => handleEdit(false)}>Cancel</TextLink>}
      <Button
        disabled={!isEmailValid(value) || isLoading}
        size={'lg'}
        onClick={handleSave}
        width={96}
      >
        {isLoading ? <Spinner size={15} /> : 'Next'}
      </Button>
    </Flex>
  </Flex>
);

export default EditEmailView;
