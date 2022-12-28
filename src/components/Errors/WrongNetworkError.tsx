import React from 'react';
import { useTheme } from 'styled-components';
import { useChannelContext } from 'context/ChannelContext';
import Text from 'components/Text';
import { CHAIN_NAMES } from 'global/const';
import { useAuthContext } from 'context/AuthContext';

const WrongNetworkError = ({ ...props }) => {
  const { isLoggedIn } = useAuthContext();
  const { chainId, isWrongNetwork } = useChannelContext();
  const theme = useTheme();

  return (
    <>
      {isWrongNetwork && !isLoggedIn && (
        <Text color={theme.w.colors.error.main} align="center" {...props}>
          Wrong network, please switch to {CHAIN_NAMES[chainId]} in your wallet to make changes
        </Text>
      )}
    </>
  );
};

export default WrongNetworkError;
