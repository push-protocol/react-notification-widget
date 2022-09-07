import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useCommsChannelQuery } from 'graphql/EpnsChannelInfo/operations.generated';

export type EpnsChannelInfo = {
  icon: string;
  name: string;
  channel: string;
};

const emptyChannel = {
  channel: '',
  icon: '',
  name: '',
};

const ChannelContext = createContext<EpnsChannelInfo>({} as EpnsChannelInfo);

const ChannelProvider = ({ partnerKey, children }: { partnerKey: string; children: ReactNode }) => {
  const [channel, setChannel] = useState<EpnsChannelInfo>();
  const { data } = useCommsChannelQuery({
    variables: {
      input: { partnerApiKey: partnerKey },
    },
  });
  useEffect(() => {
    if (!data) return;
    setChannel({
      channel: data.commsChannelByPartnerKey.channelAddress,
      icon: data.commsChannelByPartnerKey.logo as string,
      name: data.commsChannelByPartnerKey.name,
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
