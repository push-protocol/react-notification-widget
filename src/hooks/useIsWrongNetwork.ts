import { useState, useEffect } from 'react';
import { useChannelContext } from 'context/ChannelContext';
import { useAccountContext } from 'context/AccountContext';

const useIsWrongNetwork = () => {
  const { chainId: walletChain } = useAccountContext();
  const { chainId: channelChain } = useChannelContext();

  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  useEffect(() => {
    if (!channelChain || !walletChain) {
      setIsWrongNetwork(false);
      return;
    }

    setIsWrongNetwork(channelChain !== walletChain);
  }, [channelChain, walletChain]);

  return isWrongNetwork;
};

export default useIsWrongNetwork;
