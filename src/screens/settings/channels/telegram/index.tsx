import React from 'react';
import ChannelDropdown from 'screens/settings/components/ChannelDropdown';
import { Telegram as TelegramIcon } from 'components/icons';
import useTelegramActions from 'screens/settings/channels/telegram/useTelegramActions';
import IntegrateTelegram from 'screens/settings/channels/telegram/components/IntegrateTelegram';
import { useAuthContext } from 'context/AuthContext';
import ConnectedChannel from 'screens/settings/components/ConnectedChannel';

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
        <ConnectedChannel
          description={
            hint ? `You are receiving alerts to ${hint}` : 'You Telegram account is connected'
          }
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
