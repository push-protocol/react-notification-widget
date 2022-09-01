import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Button from 'components/Button';
import Text from 'components/Text';
import { Wallet } from 'components/icons';
import Flex from 'components/layout/Flex';

const HeaderIconContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg.main};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
`;

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const WalletDisconnected = () => {
  return (
    <CenteredContainer>
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={16} mt={8}>
        <HeaderIconContainer>
          <Wallet />
        </HeaderIconContainer>
        <StyledText size={'xl'} weight={700} mb={0.5}>
          Wallet not connected
        </StyledText>
      </Flex>
      <Flex width={'100%'}>
        <Button>Connect Wallet</Button>
      </Flex>
    </CenteredContainer>
  );
};
