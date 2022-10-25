import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { UserCommunicationChannelsDocument } from '../../context/NotificationsContext/operations.generated';
import analytics from '../../services/analytics';
import EnterVerificationCode from './components/EnterVerificationCode';
import { useValidateUserEmailMutation } from './operations.generated';
import { Screen } from 'components/layout/Screen';
import Button from 'components/Button';
import Text from 'components/Text';
import { Bell } from 'components/icons';
import Flex from 'components/layout/Flex';
import { Routes, useRouterContext } from 'context/RouterContext';
import Spinner from 'components/Spinner';
import { useChannelContext } from 'context/ChannelContext';

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

export const EmailVerify = () => {
  const [code, setCode] = useState('');
  const { setRoute, props } = useRouterContext();
  const theme = useTheme();

  const [validateEmail, { loading }] = useValidateUserEmailMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
    onCompleted() {
      analytics.track('email verified');
      setRoute(Routes.EmailVerified);
    },
  });

  useEffect(() => {
    if (code.length === 6 && props?.email) {
      validateEmail({
        variables: {
          input: {
            email: props.email,
            code,
          },
        },
      });
    }
  }, [code, props, validateEmail]);

  const handleSkip = () => {
    setRoute(Routes.NotificationsFeed);
  };

  return (
    <Screen
      navbarActionComponent={
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
      }
    >
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={2}>
        <HeaderIconContainer>
          <HeaderIcon>
            <Bell color={theme.colors.button.text} />
          </HeaderIcon>
        </HeaderIconContainer>
        <Text size={'xl'} weight={700} mb={0.5}>
          Enter verification code
        </Text>
        <Text size={'md'} align={'center'}>
          Sent to {props?.email}
        </Text>
      </Flex>
      {loading ? (
        <Flex justifyContent={'center'} alignItems={'center'} width={'100%'} height={100} mb={2}>
          <Spinner />
        </Flex>
      ) : (
        <EnterVerificationCode onChange={setCode} />
      )}
    </Screen>
  );
};
