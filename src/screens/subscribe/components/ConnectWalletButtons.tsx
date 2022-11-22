import React from 'react';
import { Connector, useConnect } from 'wagmi';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import analytics from 'services/analytics';

const ALLOWED_WALLETS = ['metaMask', 'walletConnect'];

const ConnectWalletButtons = () => {
  const { connect, connectors, isLoading } = useConnect();

  const connectWallet = (connector: Connector) => {
    analytics.track('wallet connect', { wallet: connector.id });
    connect({ connector });
  };

  return (
    <>
      {connectors
        .filter((connector) => ALLOWED_WALLETS.includes(connector.id))
        .map((connector) => (
          <Button
            disabled={!connector.ready || isLoading}
            key={connector.id}
            onClick={() => connectWallet(connector)}
            size={'lg'}
            width={'100%'}
          >
            Connect with {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && <Spinner size={15} />}
          </Button>
        ))}
    </>
  );
};

export default ConnectWalletButtons;
