import React from 'react';
import styled from 'styled-components';
import { useEnsName } from 'wagmi';
import formatAddress from '../../../helpers/functions/formatAddress';
import { UserWalletIcon } from './UserWalletIcon';
import { useAccountContext } from 'context/AccountContext';
import { useChannelContext } from 'context/ChannelContext';
import { Dots, OpenLink } from 'components/icons';
import Text from 'components/Text';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.w.spacing(2)}px;
  max-width: 260px;
`;

const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 84px;
`;

const WalletIcon = styled.div`
  width: 58px;
  height: 58px;
  color: ${({ theme }) => theme.w.colors.primary.light};
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

const WalletText = styled.a`
  width: 86px;
  height: 20px;
  text-align: center;
  margin-top: ${({ theme }) => theme.w.spacing(0.5)}px;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const OpenEtherscanLinkContainer = styled.div`
  width: 11px;
  height: 11px;
  display: flex;
  flex-shrink: 0;
`;

const Separator = styled.div`
  padding-top: ${({ theme }) => theme.w.spacing(1)}px;
  display: flex;
`;

const SeparatorIcon = styled.div`
  display: flex;
  height: 12px;
  color: ${({ theme }) => theme.w.colors.primary.main};
`;

const chainIdsToBlockExplorer: Record<number, string> = {
  1: 'https://etherscan.io',
  5: 'https://goerli.etherscan.io',
};

const ChannelToUserIcons = () => {
  const { channelAddress, icon } = useChannelContext();
  const { address, chainId } = useAccountContext();

  const blockExplorerUrl = `${chainIdsToBlockExplorer[chainId || 1]}/address/${channelAddress}`;

  const { data: channelEns } = useEnsName({ address: channelAddress as `0x${string}` });
  const { data: userEns } = useEnsName({ address });

  return (
    <Container>
      <WalletContainer>
        <FromWalletIcon>
          <img src={icon} alt="channel icon" />
        </FromWalletIcon>
        <WalletText href={blockExplorerUrl} target={'_blank'} rel={'noopener'}>
          <Text size={'sm'}>{channelEns || formatAddress(channelAddress)}</Text>
          <OpenEtherscanLinkContainer>
            <OpenLink />
          </OpenEtherscanLinkContainer>
        </WalletText>
      </WalletContainer>
      <Separator>
        <SeparatorIcon>
          <Dots />
        </SeparatorIcon>
      </Separator>
      <WalletContainer>
        <WalletIcon>
          <UserWalletIcon />
        </WalletIcon>
        <WalletText>
          <Text size={'sm'}>{!address ? 'Your wallet' : userEns || formatAddress(address)}</Text>
        </WalletText>
      </WalletContainer>
    </Container>
  );
};

export default ChannelToUserIcons;
