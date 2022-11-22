import React from 'react';
import styled from 'styled-components';
import Spinner from 'components/Spinner';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Text from 'components/Text';
import { Wallet } from 'components/icons';
import { TelegramSquare } from 'components/icons/pack/TelegramSquare';
import { useChannelContext } from 'context/ChannelContext';

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
  color: ${({ theme }) => theme.colors.primary.main};
  position: relative;
`;

const TelegramIconContainer = styled.div`
  height: 14px;
  width: 15px;
  position: absolute;
  bottom: 0;
  right: -2px;
`;

const ClientIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const IntegrateTelegram = ({
  url,
  onOpenTg,
  onGenerateUrl,
  isLoading,
  isDisabled,
}: IntegrateTelegramProps) => {
  const { icon } = useChannelContext();

  return (
    <Flex direction={'column'} width={'100%'} gap={2}>
      <Flex gap={2} alignItems={'center'}>
        <IconContainer>
          {url ? <ClientIcon src={icon} alt="channel icon" /> : <Wallet />}
          <TelegramIconContainer>
            <TelegramSquare />
          </TelegramIconContainer>
        </IconContainer>
        {url ? (
          <Text>Verify your account with the @wherever bot.</Text>
        ) : (
          <Text>Generate URL to link your wallet to your Telegram account.</Text>
        )}
      </Flex>
      <Flex justifyContent={'end'} width={'100%'}>
        <Button
          width={168}
          onClick={url ? onOpenTg : onGenerateUrl}
          disabled={isDisabled}
          size={'lg'}
        >
          {isLoading ? (
            <Spinner size={15} />
          ) : (
            <Text>{url ? 'Open Telegram' : 'Generate URL'}</Text>
          )}
        </Button>
      </Flex>
    </Flex>
  );
};

export default IntegrateTelegram;
