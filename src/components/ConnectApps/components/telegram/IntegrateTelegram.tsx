import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';
import { Wallet } from 'components/icons';
import { TelegramSquare } from 'components/icons/pack/TelegramSquare';

type IntegrateTelegramProps = {
  url?: string;
  onOpenTg: () => void;
  onGenerateUrl: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const IconContainer = styled.div`
  height: 44px;
  width: 44px;
  flex-shrink: 0;
  position: relative;
`;

const TelegramIconContainer = styled.div`
  height: 14px;
  width: 15px;
  position: absolute;
  bottom: 0;
  right: -2px;
`;

const IntegrateTelegram = ({
  url,
  onOpenTg,
  onGenerateUrl,
  isLoading,
  isDisabled,
}: IntegrateTelegramProps) => {
  return (
    <Flex direction={'column'} width={'100%'} gap={2}>
      <Flex gap={2} alignItems={'center'}>
        <IconContainer>
          <Wallet />
          <TelegramIconContainer>
            <TelegramSquare />
          </TelegramIconContainer>
        </IconContainer>
        {url ? (
          <Text>
            To connect, click the button or message @whereverLabsBot with &quot;
            <strong>/start {url.split('start=')[1]}</strong>&quot;
          </Text>
        ) : (
          <Text>Generate URL to link your wallet to your Telegram account.</Text>
        )}
      </Flex>
      <Flex justifyContent={'end'} width={'100%'}>
        <Button
          onClick={url ? onOpenTg : onGenerateUrl}
          disabled={isDisabled}
          isLoading={isLoading}
        >
          {url ? 'Open Telegram' : 'Generate URL'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default IntegrateTelegram;
