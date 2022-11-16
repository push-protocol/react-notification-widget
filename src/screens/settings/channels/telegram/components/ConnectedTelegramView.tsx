import React from 'react';
import Spinner from 'components/Spinner';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';

type ConnectedTelegramViewProps = {
  hint: string;
  handleRemove: () => void;
  isLoading: boolean;
};

const ConnectedTelegramView = ({ hint, handleRemove, isLoading }: ConnectedTelegramViewProps) => (
  <Flex direction={'column'} gap={2} width={'100%'}>
    <Text>{hint ? `You are receiving alerts to ${hint}` : 'User Connected'}</Text>
    <Flex gap={2}>
      <Button width={'100%'} onClick={handleRemove} disabled={isLoading} variant={'bgRelative'}>
        {isLoading ? <Spinner size={4} /> : 'Remove'}
      </Button>
    </Flex>
  </Flex>
);

export default ConnectedTelegramView;
