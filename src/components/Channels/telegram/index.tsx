import React from 'react';
import { Telegram as TelegramIcon } from 'components/icons';
import { useAuthContext } from 'context/AuthContext';
import IntegrateTelegram from 'components/Channels/telegram/components/IntegrateTelegram';
import useTelegramActions from 'components/Channels/telegram/useTelegramActions';
import ChannelDropdown from 'components/Channels/ChannelDropdown';
import ConnectedChannel from 'components/Channels/ConnectedChannel';

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
    deleteLoading,
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
    </ChannelDropdown>
  );
};
