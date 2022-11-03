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
  onOpenTG(): void;
  onRemoveTelegram(): void;
};

const ConnectTelegram = ({
  url,
  loading,
  onGenerateUrl,
  onOpenTG,
  onRemoveTelegram,
}: ConnectTelegramProps) => {
  const { userCommsChannels } = useNotificationsContext();

  if (userCommsChannels?.telegram?.exists) {
    return (
      <Flex alignItems={'center'} width={'100%'} gap={1} justifyContent={'space-between'} p={1}>
        <Text weight={'bold'}>
          {userCommsChannels?.telegram?.hint ? userCommsChannels?.telegram?.hint : 'User Connected'}
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
          <Text>To get started, send a message to @wherever-bot </Text>
        </Flex>
        <Link src={'https://t.me/wherever_giorgi_test_bot/'}>
          <IconContainer>
            <OpenLink />
          </IconContainer>
        </Link>
      </Flex>
      <Flex width={'100%'}>
        {url ? (
          <Button
            height={'27px'}
            fontSize={'sm'}
            p={1}
            borderRadius={'xs'}
            onClick={onOpenTG}
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
