import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { useNetwork } from 'wagmi';
import { usePartnerInfoQuery } from 'context/ChannelContext/operations.generated';
import { MessagingApp } from 'global/types.generated';
import usePreferences, {
  PreferenceCategory,
  UserPreference,
} from 'context/ChannelContext/usePreferences';

export type ChannelInfo = {
  icon: string;
  name: string;
  channelAddress: string;
  chainId: number;
  discordGuildUrl?: string | null;
  preferenceCategories: PreferenceCategory[];
  userPreferences: UserPreference;
  handleUpdateUserPreferences?: (id: string, key: string) => void;
  userChannels: MessagingApp[];
};

const emptyChannel = {
  channelAddress: '',
  icon: '',
  name: '',
  chainId: 0,
  preferenceCategories: [],
  userPreferences: {},
  userChannels: [],
};

const ChannelContext = createContext<
  ChannelInfo & { loading?: boolean; error?: ApolloError; isWrongNetwork?: boolean }
>({} as ChannelInfo);

const ChannelProvider = ({
  partnerKey,
  discordToken,
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
  const { preferenceCategories, userChannels, userPreferences, handleUpdateUserPreferences } =
    usePreferences({
      discordToken,
      discordGuildUrl: data?.partnerInfo.discordGuildUrl,
    });

  useEffect(() => {
    if (!data) return;

    setChannel({
      channelAddress: data.partnerInfo.channelAddress,
      icon: data.partnerInfo.logo as string,
      name: data.partnerInfo.name,
      chainId: data.partnerInfo.chainId,
      discordGuildUrl: data.partnerInfo.discordGuildUrl,
      preferenceCategories,
      userPreferences,
      handleUpdateUserPreferences,
      userChannels,
    });
  }, [data, preferenceCategories]);

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
