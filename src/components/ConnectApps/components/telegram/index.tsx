import React from 'react';
import Dropdown from '../../../Dropdown';
import ConnectedApp from '../ConnectedApp';
import { Telegram as TelegramIcon } from '../../../icons';
import IntegrateTelegram from './IntegrateTelegram';
import useTelegramActions from './useTelegramActions';
import { useAuthContext } from 'context/AuthContext';

type TelegramChannelProps = {
  open: boolean;
  toggleOpen: () => void;
};

export const TelegramConnector = ({ open, toggleOpen }: TelegramChannelProps) => {
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
    <Dropdown
      title={'Telegram'}
      icon={<TelegramIcon />}
      isConnected={isConnected}
      isOpen={open}
      toggleOpen={toggleOpen}
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
    </Dropdown>
  );
};
