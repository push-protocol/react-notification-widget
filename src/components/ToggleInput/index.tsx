import React, { useId } from 'react';
import styled from 'styled-components';
import { mode } from '../../theme';

const ToggleInputWrapper = styled.div`
  position: relative;
  height: 16px;
  width: 28px;
  cursor: pointer;
`;

const ToggleInputLabel = styled.label`
  position: absolute;
  top: 5px;
  left: 0;
  width: 100%;
  height: 6px;
  border-radius: 15px;
  background: ${({ theme }) => mode(theme.colors.light[10], theme.colors.dark[10])};
  transition: 0.2s;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin-top: -5px;
    margin-left: -2px;
    background: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const Input = styled.input`
  opacity: 0;
  z-index: -1;
  border-radius: 15px;
  margin: 0;
  width: 100%;
  height: 100%;
  &:checked + ${ToggleInputLabel} {
    background: ${({ theme }) => mode(theme.colors.light[30], theme.colors.dark[30])};
    &::after {
      margin-left: 16px;
      background: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const ToggleInput = ({ checked, onChange }: CheckboxProps) => {
  const uniqueId = useId();

  return (
    <ToggleInputWrapper>
      <Input
        id={uniqueId}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <ToggleInputLabel htmlFor={uniqueId} />
    </ToggleInputWrapper>
  );
};

export default ToggleInput;
