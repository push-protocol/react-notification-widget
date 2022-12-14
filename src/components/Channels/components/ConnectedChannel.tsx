import React from 'react';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';

type ConnectedChannelProps = {
  description: string;
  handleRemove: () => void;
  handleEdit?: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const ConnectedChannel = ({
  description,
  handleRemove,
  handleEdit,
  isLoading,
  isDisabled,
}: ConnectedChannelProps) => (
  <Flex direction={'column'} gap={2} width={'100%'}>
    <Text>{description}</Text>
    <Flex gap={2}>
      {handleEdit && (
        <Button width={'100%'} variant={'gray'} onClick={handleEdit}>
          Change
        </Button>
      )}
      <Button
        variant={'gray'}
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

export default ConnectedChannel;
