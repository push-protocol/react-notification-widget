import React from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import { Dots, ExportWallet } from 'components/icons';
import formatUserAddress from 'helpers/functions/formatUserAddress';

const Container = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WalletIcon = styled.div`
  width: 58px;
  height: 58px;
  color: ${({ theme }) => theme.colors.secondary.dark};
`;

const FromWalletIcon = styled.div`
  width: 58px;
  height: 58px;
  border: 1px solid #3d2652;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const WalletText = styled.div`
  width: 86px;
  height: 20px;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(0.5)}px;
`;

const Separator = styled.div`
  padding-top: ${({ theme }) => theme.spacing(1)}px;
  display: flex;
`;

const SeparatorIcon = styled.div`
  display: flex;
  height: 12px;
  color: ${({ theme }) => theme.colors.secondary.dark};
`;

const SubscribeInfo = () => {
  return (
    <Container>
      <WalletContainer>
        <FromWalletIcon>User Icon</FromWalletIcon>
        <WalletText>
          <Text size={'sm'}>Shapeshift.eth</Text>
        </WalletText>
      </WalletContainer>
      <Separator>
        <SeparatorIcon>
          <Dots />
        </SeparatorIcon>
      </Separator>
      <WalletContainer>
        <WalletIcon>
          <ExportWallet />
        </WalletIcon>
        <WalletText>
          <Text size={'sm'}>{formatUserAddress('0x7d0ashf0saha0sf102hf21927d')}</Text>
        </WalletText>
      </WalletContainer>
    </Container>
  );
};

export default SubscribeInfo;
