import React from 'react';
import styled from 'styled-components';
import { useAccount, useEnsName } from 'wagmi';
import Text from 'components/Text';
import { Dots, ExportWallet } from 'components/icons';
import formatAddress from 'helpers/functions/formatAddress';
import { useChannelContext } from 'context/ChannelContext';

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
  color: ${({ theme }) => theme.colors.primary.light};
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
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
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
  color: ${({ theme }) => theme.colors.primary.main};
`;

const SubscribeInfo = () => {
  const { channelAddress, icon } = useChannelContext();
  const { address } = useAccount();

  const { data: channelEns } = useEnsName({ address: channelAddress });
  const { data: userEns } = useEnsName({ address });

  return (
    <Container>
      <WalletContainer>
        <FromWalletIcon>
          <img src={icon} alt="channel icon" />
        </FromWalletIcon>
        <WalletText>
          <Text size={'sm'}>{channelEns || formatAddress(channelAddress)}</Text>
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
          <Text size={'sm'}>{userEns || formatAddress(address)}</Text>
        </WalletText>
      </WalletContainer>
    </Container>
  );
};

export default SubscribeInfo;
