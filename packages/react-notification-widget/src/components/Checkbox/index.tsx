import styled from 'styled-components';
import { Margins, Paddings } from '../types';

const CheckBoxWrapper = styled.div`
  position: relative;
  width: 42px;
  height: 26px;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
const CheckBox = styled.input<{ disabled?: boolean }>`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;

  &:checked + ${CheckBoxLabel} {
    background: ${({ theme }) => theme.w.colors.primary.dark};

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

  &:disabled + ${CheckBoxLabel} {
    cursor: default;
  }
`;

type CheckboxProps = {
  checked: boolean;
  onChange(value: boolean): void;
  disabled?: boolean;
} & Margins &
  Paddings;

const Checkbox = ({ checked, onChange, disabled }: CheckboxProps) => {
  return (
    <CheckBoxWrapper>
      <CheckBox
        disabled={disabled}
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
