import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { useNetwork } from 'wagmi';
import { usePartnerInfoQuery, PartnerInfoQuery } from 'context/ChannelContext/operations.generated';

export type ChannelInfo = {
  icon: string;
  name: string;
  channelAddress: string;
  chainId: number;
  messageCategories: PartnerInfoQuery['partnerInfo']['messageCategories'];
  discordGuildUrl?: string | null;
};

const emptyChannel = {
  channelAddress: '',
  icon: '',
  name: '',
  chainId: 0,
  messageCategories: [],
  preferences: [],
  userPreferences: {},
  userChannels: [],
};

const ChannelContext = createContext<
  ChannelInfo & { loading?: boolean; error?: ApolloError; isWrongNetwork?: boolean }
>({} as ChannelInfo);

const ChannelProvider = ({
  partnerKey,
  children,
}: {
  partnerKey: string;
  discordToken?: string;
  children: ReactNode;
}) => {
  const { chain: walletChain } = useNetwork();

  const [channel, setChannel] = useState<ChannelInfo>();
  const { data, loading, error } = usePartnerInfoQuery({
    variables: {
      input: { partnerApiKey: partnerKey },
    },
    skip: !partnerKey,
  });

  const isWrongNetwork = !!channel?.chainId && channel.chainId !== walletChain?.id;

  useEffect(() => {
    if (!data) return;

    setChannel({
      channelAddress: data.partnerInfo.channelAddress,
      messageCategories: data.partnerInfo.messageCategories,
      icon: data.partnerInfo.logo as string,
      name: data.partnerInfo.name,
      chainId: data.partnerInfo.chainId,
      discordGuildUrl: data.partnerInfo.discordGuildUrl,
    });
  }, [data]);

  return (
    <ChannelContext.Provider
      value={{ ...(channel || emptyChannel), loading, error, isWrongNetwork }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

function useChannelContext() {
  return useContext(ChannelContext);
}

export { ChannelProvider, useChannelContext };
