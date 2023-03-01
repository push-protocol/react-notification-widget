import React from 'react';
import styled, { useTheme, keyframes } from 'styled-components';
import { Bell } from '../../../components/icons';
import Flex from '../../../components/layout/Flex';
import { Routes, useRouterContext } from 'context/RouterContext';

const spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  30% {
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }
  70% {
    -webkit-transform: rotate(-30deg);
    transform: rotate(-30deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
`;

const IconWrapper = styled(Flex)`
  cursor: pointer;
  padding: 8px;
  height: 20px;
  width: 20px;
  transition: 0.2s all ease-in;
  &:hover {
    animation: ${spin} 0.5s ease-in;
  }
`;

const NavbarActions = () => {
  const { setRoute } = useRouterContext();
  const theme = useTheme();

  const handleGoBack = () => {
    setRoute(Routes.NotificationsFeed);
  };

  return (
    <IconWrapper onClick={handleGoBack}>
      <Bell color={theme.w.colors.text.secondary} />
    </IconWrapper>
  );
};

export default NavbarActions;
