import React from 'react';
import styled from 'styled-components';
import { useConnect, Connector } from 'wagmi';
import Spinner from '../../components/Spinner';
import analytics from '../../services/analytics';
import { Screen } from 'components/layout/Screen';
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

//wagmi connector IDs
const ALLOWED_WALLETS = ['metaMask', 'walletConnect'];

export const WalletDisconnected = () => {
  const { connect, connectors, isLoading } = useConnect();

  const connectWallet = (connector: Connector) => {
    analytics.track('wallet connect', { wallet: connector.id });
    connect({ connector });
  };

  return (
    <Screen>
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={16} mt={8}>
        <HeaderIconContainer>
          <Wallet />
        </HeaderIconContainer>
        <StyledText size={'xl'} weight={700} mb={0.5}>
          Wallet not connected
        </StyledText>
      </Flex>
      <Flex width={'100%'} gap={1.5} direction={'column'}>
        {connectors
          .filter((connector) => ALLOWED_WALLETS.includes(connector.id))
          .map((connector) => (
            <Button
              disabled={!connector.ready || isLoading}
              key={connector.id}
              onClick={() => connectWallet(connector)}
            >
              Connect with {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading && <Spinner size={15} />}
            </Button>
          ))}
      </Flex>
    </Screen>
  );
};
