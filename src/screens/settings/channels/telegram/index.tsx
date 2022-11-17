import React from 'react';
import ChannelDropdown from 'screens/settings/components/ChannelDropdown';
import { Telegram as TelegramIcon } from 'components/icons';
import useTelegramActions from 'screens/settings/channels/telegram/useTelegramActions';
import ConnectedTelegramView from 'screens/settings/channels/telegram/components/ConnectedTelegramView';
import IntegrateTelegramView from 'screens/settings/channels/telegram/components/IntegrateTelegramView';
import { useAuthContext } from 'context/AuthContext';

type TelegramChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const TelegramChannel = ({ open, setOpen }: TelegramChannelProps) => {
  const { isLoading } = useAuthContext();

  const {
    telegramVerificationUrl,
    handleSignMessage,
    handleOpenTG,
    handleRemoveTelegramIntegration,
    telegramLoading,
    deleteTelegramLoading,
    exists,
    hint,
  } = useTelegramActions();

  return (
    <ChannelDropdown
      title={'Telegram'}
      icon={<TelegramIcon />}
      connected={exists}
      open={open}
      setOpen={setOpen}
    >
      {exists ? (
        <ConnectedTelegramView
          hint={hint}
          handleRemove={handleRemoveTelegramIntegration}
          isLoading={deleteTelegramLoading || isLoading}
        />
      ) : (
        <IntegrateTelegramView
          url={telegramVerificationUrl}
          onOpenTg={handleOpenTG}
          onSignMessage={handleSignMessage}
          isLoading={telegramLoading || isLoading}
        />
      )}
    </ChannelDropdown>
  );
};
