import React, { useEffect } from 'react';
import { useConnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import analytics from 'services/analytics';
import Flex from 'components/layout/Flex';

type PropsT = {
  onConnect?: () => void;
};

const ConnectWalletButtons = (props: PropsT) => {
  const { isLoading } = useConnect({
    onSuccess: () => setTimeout(props?.onConnect || '', 2000),
  });

  useEffect(() => {
    if (isLoading) {
      analytics.track('wallet connect clicked');
    }
  }, [isLoading]);

  return (
    <Flex alignItems={'center'} direction={'column'} gap={1.5}>
      <ConnectButton label={'Connect your wallet to allow'} />
    </Flex>
  );
};

export default ConnectWalletButtons;
