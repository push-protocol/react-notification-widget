import React from 'react';
import styled from 'styled-components';
import { adjustColor } from '../utils';

const Container = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  & input:focus + span {
    box-shadow: ${({ theme }) => `0 0 1px ${theme.colors.primary.main}`};
  }
  & input:checked + span:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }
  & input:checked + span {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => adjustColor(theme.colors.primary.main, 0.3)};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  &:before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 17px;
    width: 17px;
    left: 6px;
    bottom: 4px;
    background-color: ${({ theme }) => theme.colors.button.text};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

type PropsT = { checked?: boolean; onChange: (newVal: boolean) => void };

const Switch = (props: PropsT) => {
  return (
    <Container>
      <input
        onChange={(e) => props.onChange(e.target.checked)}
        checked={props.checked}
        type="checkbox"
      />
      <Slider />
    </Container>
  );
};

export default Switch;
