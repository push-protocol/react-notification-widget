import React from 'react';
import Spinner from 'components/Spinner';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';

type ConnectedEmailViewProps = {
  hint: string;
  handleRemove: () => void;
  handleEdit: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const ConnectedEmailView = ({
  hint,
  handleRemove,
  handleEdit,
  isLoading,
  isDisabled,
}: ConnectedEmailViewProps) => (
  <Flex direction={'column'} gap={2} width={'100%'}>
    <Text>You are receiving alerts to {hint}</Text>
    <Flex gap={2}>
      <Button width={'100%'} onClick={handleEdit} variant={'bgRelative'}>
        Change
      </Button>
      <Button width={'100%'} onClick={handleRemove} disabled={isDisabled} variant={'bgRelative'}>
        {isLoading ? <Spinner size={4} /> : 'Remove'}
      </Button>
    </Flex>
  </Flex>
);

export default ConnectedEmailView;
