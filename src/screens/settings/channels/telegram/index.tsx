import React from 'react';
import ChannelDropdown from 'screens/settings/components/ChannelDropdown';
import { Telegram as TelegramIcon } from 'components/icons';
import useTelegramActions from 'screens/settings/channels/telegram/useTelegramActions';
import ConnectedTelegram from 'screens/settings/channels/telegram/components/ConnectedTelegram';
import IntegrateTelegram from 'screens/settings/channels/telegram/components/IntegrateTelegram';
import { useAuthContext } from 'context/AuthContext';

type TelegramChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const TelegramChannel = ({ open, setOpen }: TelegramChannelProps) => {
  const { isLoading } = useAuthContext();

  const {
    telegramVerificationUrl,
    handleGenerateUrl,
    handleOpenTG,
    handleRemoveTelegramIntegration,
    telegramLoading,
    deleteTelegramLoading,
    isConnected,
    hint,
  } = useTelegramActions();

  return (
    <ChannelDropdown
      title={'Telegram'}
      icon={<TelegramIcon />}
      isConnected={isConnected}
      open={open}
      setOpen={setOpen}
    >
      {isConnected ? (
        <ConnectedTelegram
          hint={hint}
          handleRemove={handleRemoveTelegramIntegration}
          isLoading={deleteTelegramLoading}
          isDisabled={deleteTelegramLoading || isLoading}
        />
      ) : (
        <IntegrateTelegram
          url={telegramVerificationUrl}
          onOpenTg={handleOpenTG}
          onGenerateUrl={handleGenerateUrl}
          isLoading={telegramLoading}
          isDisabled={telegramLoading || isLoading}
        />
      )}
    </ChannelDropdown>
  );
};
