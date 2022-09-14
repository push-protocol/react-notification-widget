import React, { useState } from 'react';
import styled from 'styled-components';
import VerificationInput from 'react-verification-input';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import Button from 'components/Button';
import useCountDown from 'helpers/hooks/useCountDown';

const ResendButton = styled(Button)`
  height: 27px;
  width: 55px;
  font-size: 12px;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

const InputWrapper = styled.div`
  width: 100%;
  .vi__wrapper {
    width: 100%;
    .vi {
      border: none;
    }
    .vi__container {
      background: transparent;
      height: 64px;
      width: 100%;
      border: none;
      .vi__character {
        background: transparent;
        border-radius: ${({ theme }) => theme.borderRadius.md};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.gray[200]};
      }
      .vi__character--inactive {
        border: 1px solid ${({ theme }) => theme.colors.gray[200]};
      }
      .vi__character--selected {
        border: 2px solid ${({ theme }) => theme.colors.primary.light};
      }
    }
  }
`;

type EnterVerificationCodeProps = {
  onChange(value: string): void;
};

const RESEND_DURATION = 60;

const EnterVerificationCode = ({ onChange }: EnterVerificationCodeProps) => {
  // const { time, resetTimer } = useCountDown({ seconds: RESEND_DURATION });

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
      width={'100%'}
      mb={1}
      pl={3}
      pr={3}
      style={{ boxSizing: 'border-box' }}
    >
      <Flex mb={2} width={'100%'}>
        <InputWrapper>
          <VerificationInput autoFocus length={6} placeholder={''} onChange={onChange} />
        </InputWrapper>
      </Flex>
      {/*{time ? (*/}
      {/*  <Text size={'sm'} color={'secondary'} opacity={0.8}>*/}
      {/*    Sending a new code in {time}s*/}
      {/*  </Text>*/}
      {/*) : (*/}
      {/*  <Button onClick={() => resetTimer()}>Resend</Button>*/}
      {/*)}*/}
    </Flex>
  );
};

export default EnterVerificationCode;
