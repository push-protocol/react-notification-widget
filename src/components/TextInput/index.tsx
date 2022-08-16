import styled from '@emotion/styled/macro';
import { ReactElement, HTMLInputTypeAttribute, useState, ChangeEventHandler } from 'react';
import Flex from '../layout/Flex';
import Text from '../Text';
import { adjustColor } from '../utils';

const Input = styled.input<{ width?: string | number }>(({ theme, width }) => ({
  border: '1px solid transparent',
  transition: 'border-color 0.5s ease ',
  borderRadius: 6,
  width: width || 250,
  padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  backgroundColor: adjustColor(theme.colors.bg.main, theme.mode === 'dark' ? -20 : 20),
  color: theme.colors.text.primary,
  '&:focus': {
    borderColor: theme.colors.primary,
  },
}));

type TextInputProps = {
  title?: string;
  placeholder?: string;
  width?: string | number;
  leftIcon?: ReactElement;
  type?: HTMLInputTypeAttribute;
  onValueChange?: (value: string) => void;
};

const TextInput = (props: TextInputProps) => {
  const [value, setValue] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    props?.onValueChange?.(e.target.value);
  };

  return (
    <div>
      {props.title && (
        <Text ml={props.leftIcon && 4} mb={1.5} color={'secondary'} size={'lg'}>
          {props.title}
        </Text>
      )}
      <Flex alignItems={'center'} gap={1}>
        {props.leftIcon}
        <div>
          <Input
            width={props.width}
            value={value}
            onChange={onChange}
            type={props.type || 'text'}
            placeholder={props.placeholder}
          />
        </div>
      </Flex>
    </div>
  );
};

export default TextInput;
