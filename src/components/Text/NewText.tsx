import React, { ReactNode } from 'react';
import styled from 'styled-components';

enum Sizes {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

interface TextProps {
  children?: ReactNode;
  size: Sizes;
  className?: string;
}

const StyledText = styled.h1<{ size: Sizes }>`
  font-size: ${({ theme, size }) => theme.fontSize[size]};
`;

// TEMP: possibly replace index.tsx with this or remove
export const Text = ({ children, size, className }: TextProps) => {
  return (
    <StyledText size={size} className={className}>
      {children}
    </StyledText>
  );
};
