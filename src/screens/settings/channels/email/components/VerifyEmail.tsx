import React, { useState } from 'react';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import Flex from 'components/layout/Flex';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import { Routes, useRouterContext } from 'context/RouterContext';

type VerifyEmailProps = {
  email: string;
  handleVerify: (code: string) => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const CODE_REGEX = '^[0-9]*$';

const VerifyEmail = ({ email, handleVerify, isLoading, isDisabled }: VerifyEmailProps) => {
  const { setRoute } = useRouterContext();
  const [code, setCode] = useState('');

  const onSubmit = () => {
    if (code.length === 6) {
      handleVerify(code);
    }
  };

  // Settings, VerifyEmail and ConnectEmail routes render same page but is used for convenient UI rendering based on route
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
          <Button variant="text" onClick={handleModifyEmail} size={'md'}>
            Change
          </Button>
        </Flex>
        <Button
          disabled={code.length !== 6 || isDisabled}
          size={'lg'}
          onClick={onSubmit}
          width={96}
        >
          {isLoading ? <Spinner size={15} /> : 'Submit'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default VerifyEmail;
