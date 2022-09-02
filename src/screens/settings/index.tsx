import React, { useState } from 'react';
import styled from 'styled-components';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Button from 'components/Button';
import Text from 'components/Text';
import { Bell } from 'components/icons';
import Flex from 'components/layout/Flex';
import HideEmailCheckbox from 'screens/settings/components/HideEmailCheckbox';
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
  background: ${({ theme }) => theme.colors.primary.dark};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
`;

const HeaderIcon = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primary.dark};
`;

export const Settings = () => {
  const [hideEmail, setHideEmail] = useState(true);
  const [email, setEmail] = useState('');
  const { setRoute } = useRouterContext();

  const [saveEmail, { loading }] = useSaveUserEmailMutation({
    onCompleted() {
      setRoute(Routes.VerifyEmail);
    },
    variables: {
      input: { email: email },
    },
  });

  const handleSave = () => {
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
          Skip
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
          We will alert you when new messages are received in your wallet.
        </Text>
      </Flex>
      <EmailInput onChange={setEmail} isValid={isEmailValid(email)} handleSave={handleSave} />
      <HideEmailCheckbox checked={hideEmail} onChange={setHideEmail} />
    </CenteredContainer>
  );
};
