import React from 'react';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';

type ConnectedEmailProps = {
  hint: string;
  handleRemove: () => void;
  handleEdit: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const ConnectedEmail = ({
  hint,
  handleRemove,
  handleEdit,
  isLoading,
  isDisabled,
}: ConnectedEmailProps) => (
  <Flex direction={'column'} gap={2} width={'100%'}>
    <Text>You are receiving alerts to {hint}</Text>
    <Flex gap={2}>
      <Button width={'100%'} onClick={handleEdit}>
        Change
      </Button>
      <Button
        variant={'outlined'}
        width={'100%'}
        onClick={handleRemove}
        disabled={isDisabled}
        isLoading={isLoading}
      >
        Remove
      </Button>
    </Flex>
  </Flex>
);

export default ConnectedEmail;
