import React from 'react';
import AppDropdown from '../AppDropdown';
import ConnectedApp from '../ConnectedApp';
import IntegrateTelegram from './IntegrateTelegram';
import useTelegramActions from './useTelegramActions';
import { useAuthContext } from 'context/AuthContext';
import { Telegram as TelegramIcon } from 'components/icons';

type TelegramChannelProps = {
  open: boolean;
  setOpen: () => void;
};

export const TelegramConnector = ({ open, setOpen }: TelegramChannelProps) => {
  const { isLoading } = useAuthContext();

  const {
    telegramVerificationUrl,
    handleGenerateUrl,
    handleOpenTG,
    handleRemoveTelegramIntegration,
    telegramLoading,
    deleteLoading,
    isConnected,
    hint,
  } = useTelegramActions();

  return (
    <AppDropdown
      title={'Telegram'}
      icon={<TelegramIcon />}
      isConnected={isConnected}
      open={open}
      setOpen={setOpen}
    >
      {isConnected ? (
        <ConnectedApp
          description={
            hint ? `You are receiving alerts to ${hint}` : 'You Telegram account is connected'
          }
          handleRemove={handleRemoveTelegramIntegration}
          isLoading={deleteLoading}
          isDisabled={deleteLoading || isLoading}
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
    </AppDropdown>
  );
};
