import React from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import { OpenLink } from 'components/icons';
import Link from 'components/Link';
import { useNotificationsContext } from 'context/NotificationsContext';

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
};

const ConnectTelegram = ({ url, loading, onGenerateUrl, onOpenTG }: ConnectTelegramProps) => {
  const { userCommsChannels } = useNotificationsContext();
  console.log(userCommsChannels?.telegram); // TODO: display telegram connected when BE returns value
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
