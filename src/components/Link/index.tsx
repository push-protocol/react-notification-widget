import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a<{ fontWeight?: string | number }>`
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.primary.light};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'inherit')};
  font-family: ${({ theme }) => theme.fontFamily};
  &:hover {
    text-decoration: underline;
  }
`;

type LinkProps = {
  src?: string;
  children?: ReactNode;
  fontWeight?: string | number;
};

const Link = ({ src, children, fontWeight }: LinkProps) => {
  return (
    <StyledLink href={src} target={'_blank'} rel="noopener" fontWeight={fontWeight}>
      {children}
    </StyledLink>
  );
};

export default Link;
