import React from "react";
import styled, { keyframes, css, useTheme } from "styled-components";
import { mode } from "../../../theme";
import { Bell } from "../../icons";
import CrossedOutBell from "./CrossedOutBell";

type PropsT = {
  onClick: () => void;
  selected: boolean;
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

const BellIconContainer = styled.div<{ selected: boolean }>`
  cursor: pointer;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  padding: 8px;
  box-sizing: content-box;
  transition: all 0.2s ease-in-out;
  animation: ${({ selected }) => (selected ? enlargeAnimation : undefined)};
  color: ${({ selected, theme: { w } }) =>
    selected
      ? mode(w.colors.light[80], w.colors.dark[80])
      : mode(w.colors.light[30], w.colors.dark[30])};
  background: ${({ selected, theme: { w } }) =>
    selected ? mode(w.colors.light[30], w.colors.dark[30]) : undefined};
  border: ${({ selected, theme: { w } }) =>
    selected
      ? `1px solid ${mode(w.colors.light[80], w.colors.dark[80])}`
      : `1px solid ${mode(w.colors.light[30], w.colors.dark[30])}`};
  &:hover {
    transform: scale(1.1);
    ${({ selected, theme: { w } }) =>
      !selected && {
        borderColor: mode(w.colors.light[70], w.colors.dark[70]),
        color: mode(w.colors.light[70], w.colors.dark[70]),
      }}
  }
`;

const PreferenceBell = (props: PropsT) => {
  const { w } = useTheme();

  const handleClick = () => {
    props.onClick();
  };

  return (
    <BellIconContainer selected={props.selected} onClick={handleClick}>
      {props.selected ? (
        <Bell color={w.colors.text.primary} />
      ) : (
        <CrossedOutBell />
      )}
    </BellIconContainer>
  );
};

export default PreferenceBell;
