import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

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
  isValid?: boolean;
  onChange(value: string): void;
};

const EnterEmail = ({ isValid, onChange }: EnterEmailProps) => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
      width={'100%'}
      mb={2}
    >
      <Wrapper>
        <TextInput placeholder={'email@example.com'} onValueChange={(value) => onChange(value)} />
        {isValid && (
          <ButtonWrapper>
            <Button width={'44px'} height={'27px'} fontSize={'sm'} p={0} borderRadius={'xs'}>
              Save
            </Button>
          </ButtonWrapper>
        )}
      </Wrapper>
    </Flex>
  );
};

export default EnterEmail;
