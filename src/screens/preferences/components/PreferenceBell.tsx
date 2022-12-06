import React from 'react';
import styled, { keyframes, css, useTheme } from 'styled-components';
import { Bell } from '../../../components/icons';
import { adjustColor } from '../../../components/utils';
import CrossedOutBell from './CrossedOutBell';

type PropsT = {
  onClick: () => void;
  enabled: boolean;
  disabled: boolean;
};

const enlarge = keyframes`
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }`;

const enlargeAnimation = css`
  ${enlarge} 0.2s ease-in
`;

const BellIconContainer = styled.div<{ enabled: boolean; disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? undefined : 'pointer')};
  height: 18px;
  width: 18px;
  border-radius: 50%;
  padding: 8px;
  animation: ${({ enabled }) => (enabled ? enlargeAnimation : undefined)};
  border: ${({ enabled, theme }) =>
    enabled ? `1px solid ${theme.colors.text.primary}` : '1px solid transparent'};
`;

const PreferenceBell = (props: PropsT) => {
  const theme = useTheme();

  return (
    <BellIconContainer disabled={props.disabled} enabled={props.enabled} onClick={props.onClick}>
      {props.enabled ? (
        <Bell color={theme.colors.text.primary} />
      ) : (
        <CrossedOutBell color={adjustColor(theme.colors.text.primary, 0.3)} />
      )}
    </BellIconContainer>
  );
};

export default PreferenceBell;
