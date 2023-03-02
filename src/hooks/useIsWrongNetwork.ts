import { useState, useEffect } from 'react';
import { useChannelContext } from 'context/ChannelContext';
import { useSignerContext } from 'context/SignerContext';

const useIsWrongNetwork = () => {
  const { chainId: walletChain } = useSignerContext();
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
