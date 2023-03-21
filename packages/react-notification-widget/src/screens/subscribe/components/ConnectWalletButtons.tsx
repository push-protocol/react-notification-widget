import React, { useState } from 'react';
import { Connector, useConnect } from 'wagmi';
import Button from 'components/Button';
import analytics from 'services/analytics';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';

const ALLOWED_WALLETS = ['metaMask', 'walletConnect', 'coinbaseWallet'];

const isMobile = function () {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
};

type PropsT = {
  onConnect?: () => void;
};

const ConnectWalletButtons = (props: PropsT) => {
  const { connect, connectors, isLoading } = useConnect({
    onSuccess: () => setTimeout(props?.onConnect || '', 2000),
  });
  const [selectedWallet, setSelectedWallet] = useState('');

  const connectWallet = async (connector: Connector) => {
    analytics.track('wallet connect clicked', { wallet: connector.id });
    setSelectedWallet(connector.id);

    if (connector.id === 'metaMask' && isMobile()) {
      if (connector.ready) {
        return connect({ connector });
      }

      window.open(`https://metamask.app.link/dapp/${window.location.href}`, '_blank');
      return;
    }

    connect({ connector });
  };

  return (
    <Flex alignItems={'center'} direction={'column'} gap={1.5}>
      <Text mb={1} size={'sm'} align={'center'}>
        <strong>Connect your wallet to continue</strong>
      </Text>
      {connectors
        .filter((connector) => ALLOWED_WALLETS.includes(connector.id))
        .map((connector) => (
          <Button
            disabled={isLoading}
            key={connector.id}
            onClick={() => connectWallet(connector)}
            width={300}
            isLoading={isLoading && selectedWallet === connector.id}
          >
            {connector.name}
          </Button>
        ))}
    </Flex>
  );
};

export default ConnectWalletButtons;
