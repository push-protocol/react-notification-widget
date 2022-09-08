import React, { useState } from 'react';
import styled from 'styled-components';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Button from 'components/Button';
import Text from 'components/Text';
import { Bell } from 'components/icons';
import Flex from 'components/layout/Flex';
import EmailHiddenNotice from 'screens/settings/components/EmailHiddenNotice';
import EmailInput from 'screens/settings/components/EmailInput';
import isEmailValid from 'helpers/functions/isEmailValid';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useSaveUserEmailMutation } from 'screens/settings/operations.generated';

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

export const Settings = () => {
  const [hideEmail, setHideEmail] = useState(true);
  const [email, setEmail] = useState('');
  const { setRoute, activeRoute } = useRouterContext();
  const { login, isLoggedIn } = useRouterContext();

  const [saveEmail, { loading }] = useSaveUserEmailMutation({
    onCompleted() {
      setRoute(Routes.VerifyEmail, { email: email });
    },
    variables: {
      input: { email: email },
    },
  });

  const handleSave = async () => {
    if (!isLoggedIn) return await login();
    saveEmail();
  };

  const handleSkip = () => {
    setRoute(Routes.NotificationsFeed);
  };

  return (
    <CenteredContainer>
      <Flex justifyContent={'end'} width={'100%'}>
        <Button
          variant={'gray'}
          width={'44px'}
          height={'27px'}
          fontSize={'sm'}
          p={0}
          borderRadius={'xs'}
          onClick={handleSkip}
        >
          {activeRoute === Routes.Settings ? 'Back' : 'Skip'}
        </Button>
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={2}>
        <HeaderIconContainer>
          <HeaderIcon>
            <Bell />
          </HeaderIcon>
        </HeaderIconContainer>
        <Text size={'xl'} weight={700} mb={0.5}>
          Connect your email
        </Text>
        <Text size={'md'} align={'center'}>
          Get alerts you when new messages are received in your wallet.
        </Text>
      </Flex>
      <EmailInput
        onChange={setEmail}
        value={email}
        isValid={isEmailValid(email)}
        isLoading={loading}
        handleSave={handleSave}
      />
      <EmailHiddenNotice />
    </CenteredContainer>
  );
};
