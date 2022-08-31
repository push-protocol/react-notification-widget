import React, { ReactNode } from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  width: 350px;
  box-sizing: border-box;
  min-height: 250px;
  overflow-y: auto;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 2px solid ${(props) => props.theme.colors.border.main};
  box-shadow: 0 20px 36px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.colors.bg.main};
  color: ${(props) => props.theme.colors.text.primary};
  padding: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface LayoutProps {
  children?: ReactNode;
}

export const WidgetContainer = ({ children }: LayoutProps) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};
