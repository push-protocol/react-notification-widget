import React, { useState } from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import { Routes, useRouterContext } from 'context/RouterContext';

const TextLink = styled(Text)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.main};
`;

type VerifyEmailViewProps = {
  email: string;
  handleVerify: (code: string) => void;
  handleEdit: (edit: boolean) => void;
  isLoading: boolean;
};

const CODE_REGEX = '^[0-9]*$';

const VerifyEmailView = ({ email, handleVerify, isLoading, handleEdit }: VerifyEmailViewProps) => {
  const { setRoute } = useRouterContext();
  const [code, setCode] = useState('');

  const onSubmit = () => {
    if (code.length === 6) {
      handleVerify(code);
    }
  };

  const handleModifyEmail = () => {
    setRoute(Routes.Settings);
  };

  const onCodeChange = (value: string) => {
    if (value.match(CODE_REGEX)) {
      setCode(value);
    }
  };

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
      width={'100%'}
      gap={1}
    >
      <TextInput
        placeholder={'Enter verification code'}
        value={code}
        onValueChange={onCodeChange}
      />
      <Flex justifyContent={'space-between'} width={'100%'}>
        <Flex direction={'column'} height={'100%'} justifyContent={'center'}>
          <Text>Sent to {email}</Text>
          <TextLink onClick={handleModifyEmail}>Change</TextLink>
        </Flex>
        <Button disabled={code.length !== 6 || isLoading} size={'lg'} onClick={onSubmit} width={96}>
          {isLoading ? <Spinner size={15} /> : 'Submit'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default VerifyEmailView;
