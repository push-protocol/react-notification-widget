import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Screen } from 'components/layout/Screen';
import Button from 'components/Button';
import Text from 'components/Text';
import { Bell } from 'components/icons';
import Flex from 'components/layout/Flex';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import { EmailChannel, TelegramChannel } from 'screens/settings/channels';
import HiddenNotice from 'screens/settings/components/HiddenNotice';

const Header = styled(Flex)`
  pointer-events: none;
`;

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

enum CHANNELS {
  EMAIL,
  TELEGRAM,
}

export const Settings = () => {
  const { unsubscribe } = useAuthContext();
  const { isFirstLogin } = useAuthContext();
  const { setRoute } = useRouterContext();
  const theme = useTheme();

  const [channelOpen, setChannelOpen] = useState<CHANNELS | undefined>(CHANNELS.EMAIL);

  const toggleChannelOpen = (channel: CHANNELS) => {
    channelOpen === channel ? setChannelOpen(undefined) : setChannelOpen(channel);
  };

  const handleSkip = () => {
    setRoute(Routes.NotificationsFeed);
  };

  const handleUnsubscribe = () => {
    setChannelOpen(undefined);
    unsubscribe();
  };

  return (
    <Screen
      navbarActionComponent={
        <Button variant={'gray'} fontSize={'sm'} p={1} borderRadius={'sm'} onClick={handleSkip}>
          {isFirstLogin ? 'Skip' : 'Back'}
        </Button>
      }
    >
      <Header justifyContent={'center'} alignItems={'center'} direction={'column'} mb={2} mt={-4}>
        <HeaderIconContainer>
          <HeaderIcon>
            <Bell color={theme.colors.button.text} />
          </HeaderIcon>
        </HeaderIconContainer>
        <Text size={'xl'} weight={700} mb={1}>
          Set Up Notifications
        </Text>
        <Text size={'md'} weight={500} mb={0.5} align={'center'}>
          Choose one or more channels to receive alerts when new messages hit your wallet.
        </Text>
      </Header>
      <Flex gap={1} width={'100%'} direction={'column'} mb={2}>
        <EmailChannel
          open={channelOpen === CHANNELS.EMAIL}
          setOpen={() => toggleChannelOpen(CHANNELS.EMAIL)}
        />
        <TelegramChannel
          open={channelOpen === CHANNELS.TELEGRAM}
          setOpen={() => toggleChannelOpen(CHANNELS.TELEGRAM)}
        />
      </Flex>
      {process.env.WHEREVER_ENV === 'development' && (
        <Flex width={'100%'} justifyContent={'center'}>
          <Button
            variant={'outlined'}
            onClick={handleUnsubscribe}
            height={20}
            p={0}
            mb={1}
            width={90}
          >
            <Text size={'sm'}>Unsubscribe</Text>
          </Button>
        </Flex>
      )}
      <HiddenNotice />
    </Screen>
  );
};
