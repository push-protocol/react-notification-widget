import React from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import { OpenLink } from 'components/icons';
import Link from 'components/Link';
import { useNotificationsContext } from 'context/NotificationsContext';
import {
  useDeleteTelegramIntegrationMutation,
  useDeleteUserEmailMutation,
} from 'screens/settings/operations.generated';
import { useAuthContext } from 'context/AuthContext';

const IconContainer = styled.div`
  height: 11px;
  width: 11px;
  display: flex;
  cursor: pointer;
  margin-bottom: 2px;
`;

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
          height={'27px'}
          width={'62px'}
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
      <Flex width={'100%'}>
        {url ? (
          <Button
            height={'27px'}
            fontSize={'sm'}
            p={1}
            borderRadius={'xs'}
            onClick={onOpenTg}
            disabled={loading}
          >
            Open TG
          </Button>
        ) : (
          <Button
            height={'27px'}
            fontSize={'sm'}
            p={1}
            borderRadius={'xs'}
            onClick={onGenerateUrl}
            disabled={loading}
          >
            Generate URL
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ConnectTelegram;
