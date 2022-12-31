import React, { MutableRefObject, ReactElement, useEffect, useRef } from 'react';
import { DiscordConnector } from './components/discord';
import { EmailConnector } from './components/email';
import { TelegramConnector } from './components/telegram';
import { MessagingApp } from 'global/types.generated';
import Flex from 'components/layout/Flex';

const ConnectApps = ({
  apps,
  appOpen,
  setAppOpen,
}: {
  apps: MessagingApp[];
  appOpen?: MessagingApp;
  setAppOpen: (open?: MessagingApp) => void;
}) => {
  const appRefs: { [key in MessagingApp]?: MutableRefObject<any> } = {
    [MessagingApp.Discord]: useRef<HTMLDivElement | null>(null),
    [MessagingApp.Telegram]: useRef<HTMLDivElement | null>(null),
    [MessagingApp.Email]: useRef<HTMLDivElement | null>(null),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (appOpen && appRefs[appOpen]?.current) {
        appRefs[appOpen]?.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200); // Needed because of app dropdown animation

    return () => clearTimeout(timer);
  }, [appOpen]);

  const toggleChannelOpen = (channel: MessagingApp) => {
    appOpen === channel ? setAppOpen(undefined) : setAppOpen(channel);
  };

  const appConnectors: { [key in MessagingApp]?: ReactElement } = {
    [MessagingApp.Discord]: (
      <div key={MessagingApp.Discord}>
        <DiscordConnector
          open={appOpen === MessagingApp.Discord}
          setOpen={() => toggleChannelOpen(MessagingApp.Discord)}
        />
        <span ref={appRefs[MessagingApp.Discord]} />
      </div>
    ),
    [MessagingApp.Email]: (
      <div key={MessagingApp.Email}>
        <EmailConnector
          open={appOpen === MessagingApp.Email}
          setOpen={() => toggleChannelOpen(MessagingApp.Email)}
        />
        <span ref={appRefs[MessagingApp.Email]} />
      </div>
    ),
    [MessagingApp.Telegram]: (
      <div key={MessagingApp.Telegram}>
        <TelegramConnector
          open={appOpen === MessagingApp.Telegram}
          setOpen={() => toggleChannelOpen(MessagingApp.Telegram)}
        />
        <span ref={appRefs[MessagingApp.Telegram]} />
      </div>
    ),
  };

  return (
    <Flex gap={1} width={'100%'} direction={'column'} mb={2}>
      {apps.map((app) => appConnectors[app])}
    </Flex>
  );
};

export default ConnectApps;
