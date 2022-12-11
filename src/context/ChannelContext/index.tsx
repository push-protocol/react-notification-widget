import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ApolloError } from '@apollo/client';
import { useNetwork } from 'wagmi';
import { usePartnerInfoQuery } from 'context/ChannelContext/operations.generated';
import { MessagingApp } from 'global/types.generated';

export type UserPrefs = Record<string, { [key in MessagingApp]: boolean }>;

export const userChannels = ['DISCORD', 'TELEGRAM', 'EMAIL'] as MessagingApp[];

// Temp categories
const prefCategories = [
  { title: 'Marketing' },
  { title: 'Product Updates' },
  { title: 'Announcements' },
  { title: 'Liquidation Alerts' },
];

export type ChannelInfo = {
  icon: string;
  name: string;
  channelAddress: string;
  chainId: number;
  discordGuildUrl?: string | null;
  userPrefs: UserPrefs;
  prefCategories: { title: string }[];
  enabledPrefs: Record<string, boolean>;
  togglePref?: (pref: string) => void;
  handlePreferenceChange?: (pref: string, channel: MessagingApp) => void;
};

const emptyChannel = {
  channelAddress: '',
  icon: '',
  name: '',
  chainId: 0,
  prefCategories: [],
  userPrefs: {},
  enabledPrefs: {},
};

const ChannelContext = createContext<
  ChannelInfo & { loading?: boolean; error?: ApolloError; isWrongNetwork?: boolean }
>({} as ChannelInfo);

const ChannelProvider = ({ partnerKey, children }: { partnerKey: string; children: ReactNode }) => {
  const { chain: walletChain } = useNetwork();

  const [channel, setChannel] = useState<ChannelInfo>();
  const { data, loading, error } = usePartnerInfoQuery({
    variables: {
      input: { partnerApiKey: partnerKey },
    },
    skip: !partnerKey,
  });

  const isWrongNetwork = !!channel?.chainId && channel.chainId !== walletChain?.id;

  const [userPrefs, setUserPrefs] = useState<UserPrefs>({});
  const [enabledPrefs, setEnabledPrefs] = useState<Record<string, boolean>>({});

  const togglePref = (pref: string) => {
    const newPrefSetting = !enabledPrefs[pref];

    if (!newPrefSetting) {
      setUserPrefs({ ...userPrefs, [pref]: {} } as UserPrefs);
    }

    setEnabledPrefs((oldPrefs) => ({ ...oldPrefs, [pref]: newPrefSetting }));
  };

  const handlePreferenceChange = (pref: string, channel: MessagingApp) => {
    if (!enabledPrefs[pref]) return;
    const isPrefEnabled = userPrefs[pref]?.[channel];

    const newPrefs: UserPrefs = {
      ...userPrefs,
      [pref]: {
        ...userPrefs[pref],
        [channel]: !isPrefEnabled,
      },
    };

    setUserPrefs(newPrefs);
  };

  useEffect(() => {
    if (!data) return;

    setChannel({
      channelAddress: data.partnerInfo.channelAddress,
      icon: data.partnerInfo.logo as string,
      name: data.partnerInfo.name,
      chainId: data.partnerInfo.chainId,
      discordGuildUrl: data.partnerInfo.discordGuildUrl,
      userPrefs,
      enabledPrefs,
      handlePreferenceChange,
      prefCategories,
      togglePref,
    });
  }, [data, enabledPrefs, userPrefs]);

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
