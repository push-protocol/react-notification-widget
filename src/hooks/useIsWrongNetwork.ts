import { useNetwork } from 'wagmi';
import { useState, useEffect } from 'react';
import { useChannelContext } from '../context/ChannelContext';
// import { MAINNET_CHAINS, TESTNET_CHAINS } from '../global/const';

const useIsWrongNetwork = () => {
  const { chain: walletChain } = useNetwork();
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

    setIsWrongNetwork(channelChain !== walletChain.id);
  }, [channelChain, walletChain]);

  return isWrongNetwork;
};

export default useIsWrongNetwork;
