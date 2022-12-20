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

const DefaultUserChannels = Object.keys(MessagingAppInfo) as MessagingApp[];

export { MessagingAppInfo, DefaultUserChannels };
