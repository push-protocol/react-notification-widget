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
  const { refetchCommsChannel, setUserCommsChannelsPollInterval, userCommsChannels } =
    useNotificationsContext();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');

  const [getTelegramLink, { loading: telegramLoading }] = useGetTelegramVerificationLinkMutation();
  const [saveEmail, { loading: saveLoading }] = useSaveUserEmailMutation({
    variables: {
      input: { email },
    },
  });

  const [deleteEmail, { loading: deleteLoading }] = useDeleteUserEmailMutation();

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
        await refetchCommsChannel();
        analytics.track('email deleted');
        return setRoute(Routes.Settings);
      }
    });
  };

  const handleGenerateUrl = async () => {
    login(async () => {
      const response = await getTelegramLink();
      setTelegramUrl(response?.data?.telegramVerificationLink?.link || '');
    });
  };

  const handleOpenTG = async () => {
    setUserCommsChannelsPollInterval(10000);
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
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
        <Button
          variant={'gray'}
          width={'44px'}
          height={'27px'}
          fontSize={'sm'}
          p={0}
          borderRadius={'sm'}
          onClick={handleSkip}
        >
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
            url={telegramUrl}
            onGenerateUrl={handleGenerateUrl}
            onOpenTG={handleOpenTG}
            loading={telegramLoading}
          />
        </SettingsItem>
      </Flex>

      <Divider />
      <HiddenNotice />
      {process.env.WHEREVER_ENV === 'development' && (
        <Flex width={'100%'} justifyContent={'center'}>
          <Button variant={'outlined'} onClick={unsubscribe} height={20} p={0} mb={1} width={90}>
            <Text size={'sm'}>Unsubscribe</Text>
          </Button>
        </Flex>
      )}
    </Screen>
  );
};
