import React from 'react';
import { useConnect, Connector } from 'wagmi';
import Spinner from '../../components/Spinner';
import analytics from '../../services/analytics';
import { Screen } from 'components/layout/Screen';
import Button from 'components/Button';
import Flex from 'components/layout/Flex';
import ConnectHeader from 'screens/components/ConnectHeader';
import ConnectInfo from 'screens/components/ConnectInfo';
import ConnectDescription from 'screens/components/ConnectDescription';

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
      <ConnectHeader />
      <Flex alignItems={'center'} direction={'column'} mb={3} mt={2}>
        <ConnectInfo hideAddress={true} />
        <ConnectDescription
          text={
            'is using the Push Protocol to securly message its users. No spam, opt-out at any time.'
          }
        />
      </Flex>
      <Flex width={'100%'} gap={1.5} direction={'column'}>
        {connectors
          .filter((connector) => ALLOWED_WALLETS.includes(connector.id))
          .map((connector) => (
            <Button
              disabled={!connector.ready || isLoading}
              key={connector.id}
              onClick={() => connectWallet(connector)}
              size={'lg'}
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
