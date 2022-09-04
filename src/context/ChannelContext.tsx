import React, { createContext, useContext, ReactNode } from 'react';

export type EpnsChannelInfo = {
  addr: string;
  icon: string;
  name: string;
  channel?: string;
  memberCount?: number;
};

const emptyChannel = {
  addr: '',
  icon: '',
  name: '',
};

const ChannelContext = createContext<EpnsChannelInfo>({} as EpnsChannelInfo);

const ChannelProvider = ({
  channel,
  children,
}: {
  channel?: EpnsChannelInfo;
  children: ReactNode;
}) => {
  return (
    <ChannelContext.Provider value={channel || emptyChannel}>{children}</ChannelContext.Provider>
  );
};

function useChannelContext() {
  return useContext(ChannelContext);
}

export { ChannelProvider, useChannelContext };
