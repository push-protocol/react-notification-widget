import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Button from 'components/Button';
import Text from 'components/Text';
import { Bell } from 'components/icons';
import Flex from 'components/layout/Flex';
import EnterVerificationCode from 'screens/verifyEmail/components/EnterVerificationCode';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useSaveUserEmailMutation } from 'screens/settings/operations.generated';
import { useValidateUserEmailMutation } from 'screens/verifyEmail/operations.generated';
import Spinner from 'components/Spinner';

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

export const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const { setRoute, props } = useRouterContext();

  const [validateEmail, { loading }] = useValidateUserEmailMutation({
    onCompleted() {
      setRoute(Routes.EmailVerified, {});
    },
  });

  useEffect(() => {
    if (code.length === 6 && props?.email) {
      validateEmail({
        variables: {
          input: {
            email: props.email,
            code: code,
          },
        },
      });
    }
  }, [code, props, validateEmail]);

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
          Enter verification code
        </Text>
        <Text size={'md'} align={'center'}>
          Sent to {props?.email}
        </Text>
      </Flex>
      {loading ? <Spinner /> : <EnterVerificationCode onChange={setCode} />}
    </CenteredContainer>
  );
};
