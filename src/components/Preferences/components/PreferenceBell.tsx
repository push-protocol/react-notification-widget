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
  animation: ${({ selected, disabled }) => (selected && !disabled ? enlargeAnimation : undefined)};
  color: ${({ selected, disabled, theme }) =>
    selected && !disabled
      ? mode(theme.w.colors.light[80], theme.w.colors.dark[80])
      : mode(theme.w.colors.light[30], theme.w.colors.dark[30])};
  background: ${({ selected, disabled, theme }) =>
    selected && !disabled ? mode(theme.w.colors.light[30], theme.w.colors.dark[30]) : undefined};
  border: ${({ selected, disabled, theme }) =>
    selected && !disabled ? `1px solid ${theme.w.colors.text.primary}` : '1px solid transparent'};
`;

const PreferenceBell = (props: PropsT) => {
  const theme = useTheme();

  const handleClick = () => {
    if (props.disabled) {
      return;
    }

    props.onClick();
  };

  return (
    <BellIconContainer disabled={props.disabled} selected={props.selected} onClick={handleClick}>
      {props.selected && !props.disabled ? (
        <Bell color={theme.w.colors.text.primary} />
      ) : (
        <CrossedOutBell />
      )}
    </BellIconContainer>
  );
};

export default PreferenceBell;
