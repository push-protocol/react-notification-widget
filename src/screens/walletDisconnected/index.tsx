import React from 'react';
import styled from 'styled-components';
import { useConnect } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import Spinner from '../../components/Spinner';
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
  const { connect, connectors, isLoading } = useConnect();

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
      <Flex width={'100%'} direction={'column'}>
        {connectors.map((connector) => (
          <Button
            disabled={!connector.ready || isLoading}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            Connect Wallet
            {!connector.ready && ' (unsupported)'}
            {isLoading && <Spinner size={15} />}
          </Button>
        ))}
      </Flex>
    </CenteredContainer>
  );
};
