import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import { UserCommunicationChannel } from 'global/types.generated';

const Actions = styled.div`
  height: 100%;
`;

type EnterEmailProps = {
  value: string;
  isValid?: boolean;
  onChange(value: string): void;
  handleSave(): void;
  handleRemove(): void;
  isLoading: boolean;
  email?: UserCommunicationChannel;
};

const ConnectEmail = ({
  isValid,
  value,
  onChange,
  handleSave,
  handleRemove,
  isLoading,
  email,
}: EnterEmailProps) => {
  const [isEditing, setIsEditing] = useState(!email?.exists);

  useEffect(() => {
    if (!email?.exists) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [email]);

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
      gap={1}
    >
      <TextInput
        placeholder={'email@example.com'}
        value={!isEditing ? email?.hint || value : value}
        disabled={!isEditing}
        onValueChange={(value) => onChange(value)}
      />

      <Actions>
        {isLoading ? (
          <Spinner size={15} />
        ) : (
          <Flex gap={1}>
            <Button
              fontSize={'sm'}
              p={1}
              disabled={isEditing && !isValid}
              borderRadius={'xs'}
              onClick={handleClick}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            {!isEditing && email?.exists && (
              <Button
                fontSize={'sm'}
                p={1}
                borderRadius={'xs'}
                onClick={handleRemove}
                variant={'danger'}
              >
                Remove
              </Button>
            )}
          </Flex>
        )}
      </Actions>
    </Flex>
  );
};

export default ConnectEmail;
