import React from 'react';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';

type ConnectedTelegramProps = {
  hint: string;
  handleRemove: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const ConnectedTelegram = ({
  hint,
  handleRemove,
  isLoading,
  isDisabled,
}: ConnectedTelegramProps) => (
  <Flex direction={'column'} gap={2} width={'100%'}>
    <Text>
      {hint ? `You are receiving alerts to ${hint}` : 'You Telegram account is connected'}
    </Text>
    <Flex gap={2}>
      <Button
        width={'100%'}
        onClick={handleRemove}
        disabled={isDisabled}
        variant={'semitransparent'}
        isLoading={isLoading}
      >
        Remove
      </Button>
    </Flex>
  </Flex>
);

export default ConnectedTelegram;
