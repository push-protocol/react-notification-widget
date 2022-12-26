import React from 'react';
import styled from 'styled-components';
import { Coordinates } from './components/FloatingSettings';

const Text = styled.p`
  font-family: Roboto, serif;
  font-size: 20px;
  color: white;
`;

const IframeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;
`;

const WidgetBellWrapper = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50px;
  background: #38393d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    background: #193969;
  }
`;

const TopBar = styled.div`
  width: 100%;
  height: 100px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WidgetContainer = styled.div<Coordinates>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  position: absolute;
  z-index: 10;
  top: ${({ top }) => `${top}px`};
  right: ${({ right }) => (typeof right === 'string' ? right : `${right}px`)};
  @media (max-width: 450px) {
    width: 100%;
    justify-content: center;
    top: 150px;
    left: 0;
  } ;
`;

const BackgroundLogoContainer = styled.div`
  position: fixed;
  bottom: -20px;
  left: 10px;
`;

export {
  BackgroundLogoContainer,
  TopBar,
  WidgetBellWrapper,
  WidgetContainer,
  Text,
  IframeContainer,
};
