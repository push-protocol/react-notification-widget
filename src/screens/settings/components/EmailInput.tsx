import React, { useState } from 'react';
import styled from 'styled-components';
import Spinner from '../../../components/Spinner';
import { useNotificationsContext } from 'context/NotificationsContext';
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
  value: string;
  isValid?: boolean;
  onChange(value: string): void;
  handleSave(): void;
  isLoading: boolean;
};

const EmailInput = ({ isValid, value, onChange, handleSave, isLoading }: EnterEmailProps) => {
  const { userCommsChannels } = useNotificationsContext();
  const [isEditing, setIsEditing] = useState(!userCommsChannels?.email.exists);

  const handleClick = () => {
    if (isEditing) return handleSave();
    onChange('');
    setIsEditing(true);
  };

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
          value={!isEditing ? (userCommsChannels?.email.hint as string) : value}
          disabled={!isEditing}
          onValueChange={(value) => onChange(value)}
        />
        <ButtonWrapper>
          {isLoading ? (
            <Spinner size={15} />
          ) : (
            <Button
              width={'44px'}
              height={'27px'}
              fontSize={'sm'}
              p={0}
              disabled={isEditing && !isValid}
              borderRadius={'xs'}
              onClick={handleClick}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          )}
        </ButtonWrapper>
      </Wrapper>
    </Flex>
  );
};

export default EmailInput;
