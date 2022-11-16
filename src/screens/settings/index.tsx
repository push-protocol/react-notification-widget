import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import analytics from '../../services/analytics';
import { Screen } from 'components/layout/Screen';
import Button from 'components/Button';
import Text from 'components/Text';
import { Bell, Email, Telegram } from 'components/icons';
import Flex from 'components/layout/Flex';
import HiddenNotice from 'screens/settings/components/HiddenNotice';
import ConnectEmail from 'screens/settings/components/ConnectEmail';
import isEmailValid from 'helpers/functions/isEmailValid';
import { Routes, useRouterContext } from 'context/RouterContext';
import {
  useDeleteTelegramIntegrationMutation,
  useDeleteUserEmailMutation,
  useGetTelegramVerificationLinkMutation,
  useSaveUserEmailMutation,
} from 'screens/settings/operations.generated';
import { useNotificationsContext } from 'context/NotificationsContext';
import { useAuthContext } from 'context/AuthContext';
import Spinner from 'components/Spinner';
import { changeColorShade } from 'components/utils';
import SettingsItem from 'screens/settings/components/SettingsItem';
import ConnectTelegram from 'screens/settings/components/ConnectTelegram';
import { UserCommunicationChannelsDocument } from 'context/NotificationsContext/operations.generated';
import { useChannelContext } from 'context/ChannelContext';
import WrongNetworkError from 'components/Errors/WrongNetworkError';

const HeaderIconContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
`;

const HeaderIcon = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primary.main};
`;

const Divider = styled.div`
  border-top: 1px solid ${({ theme }) => changeColorShade(theme.colors.bg.main, 20)};
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  width: 100%;
`;

export const Settings = () => {
  const { unsubscribe, login, isLoading } = useAuthContext();
  const { setRoute, activeRoute } = useRouterContext();
  const { setUserCommsChannelsPollInterval, userCommsChannels } = useNotificationsContext();
  const { isWrongNetwork } = useChannelContext();

  const theme = useTheme();

  const [email, setEmail] = useState('');

  const [getTelegramLink, { loading: telegramLoading, data: telegramUrlData }] =
    useGetTelegramVerificationLinkMutation();

  const [saveEmail, { loading: saveLoading }] = useSaveUserEmailMutation({
    variables: {
      input: { email },
    },
  });

  const [deleteEmail, { loading: deleteLoading }] = useDeleteUserEmailMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
  });
  const [deleteTelegramIntegration, { loading: deleteTelegramLoading }] =
    useDeleteTelegramIntegrationMutation({
      refetchQueries: [UserCommunicationChannelsDocument],
    });

  const handleSave = async () => {
    login(async () => {
      await saveEmail();
      analytics.track('email saved');
      return setRoute(Routes.EmailVerify, { email });
    });
  };

  const handleRemove = async () => {
    login(async () => {
      const response = await deleteEmail();

      if (response?.data?.userEmailDelete?.success) {
        analytics.track('email deleted');
        return setRoute(Routes.Settings);
      }
    });
  };

  const handleRemoveTelegramIntegration = async () => {
    login(async () => {
      const response = await deleteTelegramIntegration();

      if (response?.data?.userTelegramDelete?.success) {
        await getTelegramLink();
        analytics.track('telegram integration removed');
        return setRoute(Routes.Settings);
      }
    });
  };

  const handleGenerateUrl = async () => {
    login(async () => {
      await getTelegramLink();
    });
  };

  const handleOpenTG = async () => {
    setUserCommsChannelsPollInterval(5000);
    window.open(
      telegramUrlData?.telegramVerificationLinkGenerate?.link,
      '_blank',
      'noopener,noreferrer'
    );
  };

  useEffect(() => {
    if (userCommsChannels?.telegram?.exists) {
      setUserCommsChannelsPollInterval(0);
    }
  }, [setUserCommsChannelsPollInterval, userCommsChannels]);

  const handleSkip = () => {
    setRoute(Routes.NotificationsFeed);
  };

  if (isLoading) {
    return (
      <Screen>
        <Flex alignItems={'center'} justifyContent={'center'} height={200}>
          <Spinner />
        </Flex>
      </Screen>
    );
  }

  return (
    <Screen
      navbarActionComponent={
        <Button variant={'gray'} fontSize={'sm'} p={1} borderRadius={'sm'} onClick={handleSkip}>
          {activeRoute === Routes.Settings ? 'Back' : 'Skip'}
        </Button>
      }
    >
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={2}>
        <HeaderIconContainer>
          <HeaderIcon>
            <Bell color={theme.colors.button.text} />
          </HeaderIcon>
        </HeaderIconContainer>
        <Text size={'xl'} weight={700} mb={0.5}>
          Set Up Notifications
        </Text>
      </Flex>
      <WrongNetworkError mb={2} />
      <Flex gap={1} width={'100%'} direction={'column'} mb={2}>
        <SettingsItem title={'Email'} icon={<Email />}>
          <ConnectEmail
            onChange={setEmail}
            value={email}
            isValid={isEmailValid(email)}
            isLoading={saveLoading || deleteLoading}
            handleSave={handleSave}
            handleRemove={handleRemove}
          />
        </SettingsItem>
        <SettingsItem title={'Telegram'} icon={<Telegram />}>
          <ConnectTelegram
            url={telegramUrlData?.telegramVerificationLinkGenerate?.link}
            onGenerateUrl={handleGenerateUrl}
            onOpenTg={handleOpenTG}
            onRemoveTelegram={handleRemoveTelegramIntegration}
            loading={telegramLoading || deleteTelegramLoading}
          />
        </SettingsItem>
      </Flex>

      <Divider />
      <HiddenNotice />
      {process.env.WHEREVER_ENV === 'development' && (
        <Flex width={'100%'} justifyContent={'center'}>
          <Button
            variant={'outlined'}
            onClick={unsubscribe}
            height={20}
            p={0}
            mb={1}
            width={90}
            disabled={isWrongNetwork}
          >
            <Text size={'sm'}>Unsubscribe</Text>
          </Button>
        </Flex>
      )}
    </Screen>
  );
};
