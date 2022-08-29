import React from 'react';
import styled from 'styled-components';
import { Margins, Paddings } from 'components/types';

const CheckBoxWrapper = styled.div`
  position: relative;
  width: 42px;
  height: 26px;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 3px;
    background: #ffffff;
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: ${({ theme }) => theme.colors.primary.dark};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      margin-left: 19px;
      transition: 0.2s;
    }
  }
`;

type CheckboxProps = {
  checked: boolean;
  onChange(value: boolean): void;
} & Margins &
  Paddings;

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <CheckBoxWrapper>
      <CheckBox
        id="checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <CheckBoxLabel htmlFor="checkbox" />
    </CheckBoxWrapper>
  );
};

export default Checkbox;
