import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Wallet } from 'components/icons';
import Text from 'components/Text';
import Button from 'components/Button';

const IconContainer = styled.div`
  height: 44px;
  width: 44px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.w.colors.primary.main};
  position: relative;
`;

type IntegrateDiscordProps = {
  isLoading?: boolean;
  isDisabled?: boolean;
  onOpenDiscord: () => void;
};

const IntegrateDiscord = ({ onOpenDiscord, isLoading, isDisabled }: IntegrateDiscordProps) => {
  return (
    <Flex direction={'column'} width={'100%'} gap={2}>
      <Flex gap={2} alignItems={'center'}>
        <IconContainer>
          <Wallet />
        </IconContainer>
        <Text>Verify your account with the @wherever bot.</Text>
      </Flex>
      <Flex justifyContent={'end'} width={'100%'}>
        <Button disabled={isDisabled} isLoading={isLoading} onClick={onOpenDiscord}>
          Open Discord
        </Button>
      </Flex>
    </Flex>
  );
};

export default IntegrateDiscord;
