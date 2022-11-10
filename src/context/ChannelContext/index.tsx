import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { usePartnerInfoQuery } from 'context/ChannelContext/operations.generated';

export type ChannelInfo = {
  icon: string;
  name: string;
  channelAddress: string;
  chainId: number;
};

const emptyChannel = {
  channelAddress: '',
  icon: '',
  name: '',
  chainId: 0,
};

const ChannelContext = createContext<ChannelInfo & { loading?: boolean }>({} as ChannelInfo);

const ChannelProvider = ({ partnerKey, children }: { partnerKey: string; children: ReactNode }) => {
  const [channel, setChannel] = useState<ChannelInfo>();
  const { data, loading } = usePartnerInfoQuery({
    variables: {
      input: { partnerApiKey: partnerKey },
    },
  });

  useEffect(() => {
    if (!data) return;

    setChannel({
      channelAddress: data.partnerInfo.channelAddress,
      icon: data.partnerInfo.logo as string,
      name: data.partnerInfo.name,
      chainId: data.partnerInfo.chainId,
    });
  }, [data]);

  return (
    <ChannelContext.Provider value={{ ...(channel || emptyChannel), loading }}>
      {children}
    </ChannelContext.Provider>
  );
};

function useChannelContext() {
  return useContext(ChannelContext);
}

export { ChannelProvider, useChannelContext };
