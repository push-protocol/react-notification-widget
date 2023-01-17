import { useState, useEffect } from 'react';
import { useChannelContext } from '../context/ChannelContext';
import { useAccountContext } from '../context/AccountContext';
// import { MAINNET_CHAINS, TESTNET_CHAINS } from '../global/const';

const useIsWrongNetwork = () => {
  const { chainId: walletChain } = useAccountContext();
  const { chainId: channelChain } = useChannelContext();

  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  useEffect(() => {
    if (!channelChain || !walletChain) {
      setIsWrongNetwork(false);
      return;
    }

    // const mainnetIds = MAINNET_CHAINS.map((chain) => chain.id);
    // const testnetIds = TESTNET_CHAINS.map((chain) => chain.id);
    // const channelIsMainnet = mainnetIds.includes(channelChain);

    setIsWrongNetwork(channelChain !== walletChain);
  }, [channelChain, walletChain]);

  return isWrongNetwork;
};

export default useIsWrongNetwork;
