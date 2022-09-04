import React, { ReactElement, HTMLInputTypeAttribute, useState, ChangeEventHandler } from 'react';
import styled from 'styled-components';

import Flex from '../layout/Flex';
import Text from '../Text';
import { adjustColor } from '../utils';

const Input = styled.input<{ width?: string | number }>(({ theme, width }) => ({
  border: '2px solid transparent',
  transition: 'border-color 0.5s ease ',
  fontSize: '16px',
  borderRadius: 6,
  width: width || '100%',
  padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  backgroundColor: adjustColor(theme.colors.bg.main, theme.mode === 'dark' ? -20 : 20),
  color: theme.colors.text.primary,
  '&:focus': {
    outline: 'none',
    border: `2px solid ${theme.colors.primary.lighter}`,
  },
}));

type TextInputProps = {
  title?: string;
  value?: string;
  placeholder?: string;
  width?: string | number;
  leftIcon?: ReactElement;
  type?: HTMLInputTypeAttribute;
  onValueChange?: (value: string) => void;
};

const TextInput = (props: TextInputProps) => {
  const [value, setValue] = useState(props.value);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    props?.onValueChange?.(e.target.value);
  };

  return (
    <Flex width={'100%'}>
      {props.title && (
        <Text ml={props.leftIcon && 4} mb={1.5} color={'secondary'} size={'lg'}>
          {props.title}
        </Text>
      )}
      <Flex alignItems={'center'} gap={1} width={'100%'}>
        {props.leftIcon}
        <Flex width={'100%'}>
          <Input
            width={props.width}
            value={value}
            onChange={onChange}
            type={props.type || 'text'}
            placeholder={props.placeholder}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TextInput;
