import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { usePartnerInfoQuery } from 'graphql/EpnsChannelInfo/operations.generated';

export type ChannelInfo = {
  icon: string;
  name: string;
  channelAddress: string;
};

const emptyChannel = {
  channelAddress: '',
  icon: '',
  name: '',
};

const ChannelContext = createContext<ChannelInfo>({} as ChannelInfo);

const ChannelProvider = ({ partnerKey, children }: { partnerKey: string; children: ReactNode }) => {
  const [channel, setChannel] = useState<ChannelInfo>();
  const { data } = usePartnerInfoQuery({
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
    });
  }, [data]);

  return (
    <ChannelContext.Provider value={channel || emptyChannel}>{children}</ChannelContext.Provider>
  );
};

function useChannelContext() {
  return useContext(ChannelContext);
}

export { ChannelProvider, useChannelContext };
