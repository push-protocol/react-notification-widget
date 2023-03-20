import React, { ReactElement, HTMLInputTypeAttribute, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import Flex from '../layout/Flex';
import Text from '../Text';
import { adjustColor, changeColorShade } from '../utils';

const Input = styled.input<{ width?: string | number }>(({ theme, width }) => ({
  border: `2px solid ${theme.w.colors.primary.light}`,
  transition: 'border-color 0.5s ease ',
  fontSize: '16px',
  borderRadius: 6,
  width: width || '100%',
  padding: `${theme.w.spacing(1.5)}px ${theme.w.spacing(2)}px`,
  backgroundColor: adjustColor(theme.w.colors.bg.main, 0.8),
  color: theme.w.colors.text.primary,
  textIndent: 'unset',
  '&:disabled': {
    borderColor: adjustColor(theme.w.colors.primary.light, 0.5),
  },
  '&:focus': {
    outline: 'none',
    border: `2px solid ${changeColorShade(theme.w.colors.primary.light, 20)}`,
  },
}));

type TextInputProps = {
  title?: string;
  value: string;
  placeholder?: string;
  width?: string | number;
  leftIcon?: ReactElement;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  onValueChange?: (value: string) => void;
};

const TextInput = (props: TextInputProps) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
            disabled={props.disabled}
            width={props.width}
            value={props.value}
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
