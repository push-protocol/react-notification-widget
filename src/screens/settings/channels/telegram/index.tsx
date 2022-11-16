import React from 'react';
import SettingsItem from 'screens/settings/components/SettingsItem';
import { Telegram as TelegramIcon } from 'components/icons';
import useTelegramActions from 'screens/settings/channels/telegram/useTelegramActions';
import ConnectedTelegramView from 'screens/settings/channels/telegram/components/ConnectedTelegramView';
import IntegrateTelegramView from 'screens/settings/channels/telegram/components/IntegrateTelegramView';

export const TelegramChannel = () => {
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
    <SettingsItem title={'Telegram'} icon={<TelegramIcon />} connected={exists}>
      {exists ? (
        <ConnectedTelegramView
          hint={hint}
          handleRemove={handleRemoveTelegramIntegration}
          isLoading={deleteTelegramLoading}
        />
      ) : (
        <IntegrateTelegramView
          url={telegramVerificationUrl}
          onOpenTg={handleOpenTG}
          onSignMessage={handleSignMessage}
          isLoading={telegramLoading}
        />
      )}
    </SettingsItem>
  );
};
