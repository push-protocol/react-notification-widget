import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';
import analytics from 'services/analytics';
import Flex from 'components/layout/Flex';

const Container = styled(Flex)`
  * {
    width: 100%;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ConnectWalletButtons = () => {
  const trackClick = () => {
    analytics.track('wallet connect clicked');
  };

  return (
    <Container
      width={'100%'}
      onClick={trackClick}
      alignItems={'center'}
      direction={'column'}
      gap={1.5}
    >
      <ConnectButton label={'Connect wallet'} />
    </Container>
  );
};

export default ConnectWalletButtons;
