import React from 'react';
import styled, { keyframes, css, useTheme } from 'styled-components';
import { mode } from '../../../theme';
import CrossedOutBell from './CrossedOutBell';
import { Bell } from 'components/icons';

type PropsT = {
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
};

const enlarge = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }`;

const enlargeAnimation = css`
  ${enlarge} 0.2s ease-in
`;

const BellIconContainer = styled.div<{ selected: boolean; disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? undefined : 'pointer')};
  height: 16px;
  width: 16px;
  border-radius: 50%;
  padding: 8px;
  transition: all 0.2s ease-in-out;
  animation: ${({ selected, disabled }) => (selected && !disabled ? enlargeAnimation : undefined)};
  color: ${({ selected, disabled, theme: { w } }) =>
    selected && !disabled
      ? mode(w.colors.light[80], w.colors.dark[80])
      : mode(w.colors.light[30], w.colors.dark[30])};
  background: ${({ selected, disabled, theme: { w } }) =>
    selected && !disabled ? mode(w.colors.light[30], w.colors.dark[30]) : undefined};
  border: ${({ selected, disabled, theme: { w } }) =>
    selected && !disabled
      ? `1px solid ${mode(w.colors.light[80], w.colors.dark[80])}`
      : `1px solid ${mode(w.colors.light[30], w.colors.dark[30])}`};
  &:hover {
    transform: ${({ disabled }) => !disabled && 'scale(1.1)'};
    ${({ selected, disabled, theme: { w } }) =>
      !selected &&
      !disabled && {
        borderColor: mode(w.colors.light[70], w.colors.dark[70]),
        color: mode(w.colors.light[70], w.colors.dark[70]),
      }}
  }
`;

const PreferenceBell = (props: PropsT) => {
  const { w } = useTheme();

  const handleClick = () => {
    if (props.disabled) {
      return;
    }

    props.onClick();
  };

  return (
    <BellIconContainer disabled={props.disabled} selected={props.selected} onClick={handleClick}>
      {props.selected && !props.disabled ? (
        <Bell color={w.colors.text.primary} />
      ) : (
        <CrossedOutBell />
      )}
    </BellIconContainer>
  );
};

export default PreferenceBell;
