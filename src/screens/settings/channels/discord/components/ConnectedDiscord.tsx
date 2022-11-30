import React from 'react';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import Button from 'components/Button';

type ConnectedDiscordProps = {
  hint: string;
  handleRemove: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const ConnectedDiscord = ({ hint, handleRemove, isLoading, isDisabled }: ConnectedDiscordProps) => {
  return (
    <Flex direction={'column'} gap={2} width={'100%'}>
      <Text>
        {hint ? `You are receiving alerts to ${hint}` : 'You Discord account is connected'}
      </Text>
      <Flex gap={2}>
        <Button width={'100%'} onClick={handleRemove} disabled={isDisabled} isLoading={isLoading}>
          Remove
        </Button>
      </Flex>
    </Flex>
  );
};

export default ConnectedDiscord;
