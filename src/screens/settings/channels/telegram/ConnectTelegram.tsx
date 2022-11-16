import React from 'react';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import { useNotificationsContext } from 'context/NotificationsContext';

type ConnectTelegramProps = {
  url?: string;
  loading?: boolean;
  onGenerateUrl(): void;
  onOpenTg(): void;
  onRemoveTelegram(): void;
};

const ConnectTelegram = ({
  url,
  loading,
  onGenerateUrl,
  onOpenTg,
  onRemoveTelegram,
}: ConnectTelegramProps) => {
  const { userCommsChannels } = useNotificationsContext();

  if (userCommsChannels?.telegram?.exists) {
    return (
      <Flex alignItems={'center'} width={'100%'} gap={1} justifyContent={'space-between'} p={1}>
        <Text weight={'bold'}>
          {userCommsChannels?.telegram?.hint
            ? `Connected With: ${userCommsChannels?.telegram?.hint}`
            : 'User Connected'}
        </Text>
        <Button
          fontSize={'sm'}
          p={1}
          borderRadius={'xs'}
          onClick={onRemoveTelegram}
          disabled={loading}
          variant={'danger'}
        >
          Remove
        </Button>
      </Flex>
    );
  }

  return (
    <Flex alignItems={'center'} width={'100%'} gap={1}>
      <Flex alignItems={'end'} gap={'4px'}>
        <Flex width={'175px'}>
          <Text>To get started, send a message to the Wherever bot using the generated link </Text>
        </Flex>
      </Flex>
      <Flex width={'100%'} justifyContent={'end'} p={1}>
        <Button
          fontSize={'sm'}
          p={1}
          borderRadius={'xs'}
          onClick={url ? onOpenTg : onGenerateUrl}
          disabled={loading}
        >
          {url ? 'Open TG' : 'Generate URL'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ConnectTelegram;
