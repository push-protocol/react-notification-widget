import React, { useState } from 'react';
import { Connector, useConnect } from 'wagmi';
import Button from 'components/Button';
import analytics from 'services/analytics';

const ALLOWED_WALLETS = ['metaMask', 'walletConnect'];

const ConnectWalletButtons = () => {
  const { connect, connectors, isLoading } = useConnect();
  const [selectedWallet, setSelectedWallet] = useState('');

  const connectWallet = (connector: Connector) => {
    analytics.track('wallet connect clicked', { wallet: connector.id });
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
            onClick={() => {
              setSelectedWallet(connector.id);
              connectWallet(connector);
            }}
            width={'100%'}
            isLoading={isLoading && selectedWallet === connector.id}
          >
            Connect with {connector.name}
            {!connector.ready && ' (unsupported)'}
          </Button>
        ))}
    </>
  );
};

export default ConnectWalletButtons;
