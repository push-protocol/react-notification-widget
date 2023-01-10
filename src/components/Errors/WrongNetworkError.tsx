import React from 'react';
import { useTheme } from 'styled-components';
import { useChannelContext } from 'context/ChannelContext';
import Text from 'components/Text';
import { CHAIN_NAMES } from 'global/const';

const WrongNetworkError = ({ ...props }) => {
  const { chainId } = useChannelContext();
  const theme = useTheme();

  return (
    <Text color={theme.w.colors.error.main} align="center" {...props}>
      Please switch to {CHAIN_NAMES[chainId]} in your wallet to make changes
    </Text>
  );
};

export default WrongNetworkError;
