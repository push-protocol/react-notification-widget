import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { Routes } from 'context/RouterContext';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
`;

type EnterEmailProps = {
  value?: string;
  isValid?: boolean;
  onChange(value: string): void;
  handleSave(): void;
};

const EmailInput = ({ isValid, value, onChange, handleSave }: EnterEmailProps) => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
      width={'100%'}
      mb={2}
    >
      <Wrapper>
        <TextInput
          placeholder={'email@example.com'}
          value={value}
          onValueChange={(value) => onChange(value)}
        />
        {isValid && (
          <ButtonWrapper>
            <Button
              width={'44px'}
              height={'27px'}
              fontSize={'sm'}
              p={0}
              borderRadius={'xs'}
              onClick={handleSave}
            >
              Save
            </Button>
          </ButtonWrapper>
        )}
      </Wrapper>
    </Flex>
  );
};

export default EmailInput;
