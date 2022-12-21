import React, { ReactNode } from 'react';
import { MessagingApp } from 'global/types.generated';
import { Discord, Email, Telegram } from 'components/icons';

const MessagingAppInfo: { [key: string]: { title: string; icon: ReactNode } } = {
  [MessagingApp.Discord]: {
    title: 'Discord',
    icon: <Discord />,
  },
  [MessagingApp.Telegram]: {
    title: 'Telegram',
    icon: <Telegram />,
  },
  [MessagingApp.Email]: {
    title: 'Email',
    icon: <Email />,
  },
};

const Web2Channels = Object.keys(MessagingAppInfo) as Exclude<MessagingApp, MessagingApp.Epns>[];
export type Web2ChannelLower = Lowercase<typeof Web2Channels[0]>;

export { MessagingAppInfo, Web2Channels };
