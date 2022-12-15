import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { useNetwork } from 'wagmi';
import { usePartnerInfoQuery } from 'context/ChannelContext/operations.generated';
import { MessagingApp } from 'global/types.generated';
import usePreferenceActions, {
  PreferenceCategory,
  UserPreference,
} from 'context/ChannelContext/usePreferenceActions';

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
  setUserChannels?: (channels: MessagingApp[]) => void;
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

  const {
    preferenceCategories,
    userChannels,
    userPreferences,
    handleUpdateUserPreferences,
    setUserChannels,
  } = usePreferenceActions();

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
      setUserChannels,
    });
  }, [data, preferenceCategories, userChannels, userPreferences]);

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
