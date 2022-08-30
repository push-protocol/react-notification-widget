import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Text from 'components/Text';
import { Bell } from 'components/icons';
import Flex from 'components/layout/Flex';
import HideEmail from 'screens/settings/components/HideEmail';
import EnterEmail from 'screens/settings/components/EnterEmail';
import isEmailValid from 'helpers/functions/isEmailValid';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

  return (
    <Container>
      <Flex justifyContent={'end'} width={'100%'}>
        <Button
          variant={'gray'}
          width={'44px'}
          height={'27px'}
          fontSize={'sm'}
          p={0}
          borderRadius={'xs'}
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
      <EnterEmail onChange={setEmail} isValid={isEmailValid(email)} />
      <HideEmail checked={hideEmail} onChange={setHideEmail} />
    </Container>
  );
};
