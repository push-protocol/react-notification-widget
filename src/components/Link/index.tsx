import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a<{ fontWeight?: string | number }>`
  text-decoration: none;
  color: inherit;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'inherit')};
  &:hover {
    text-decoration: underline;
  }
`;

const TextWrapper = styled.span<{ fontWeight?: string | number }>`
  cursor: pointer;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'inherit')};
  &:hover {
    text-decoration: underline;
  }
`;

type LinkProps = {
  url?: string;
  children?: ReactNode;
  onClick?(): void;
  fontWeight?: string | number;
};

const Link = ({ url, children, onClick, fontWeight }: LinkProps) => {
  if (onClick) {
    return (
      <TextWrapper onClick={onClick} fontWeight={fontWeight}>
        {children}
      </TextWrapper>
    );
  }

  return (
    <StyledLink href={url} target={'_blank'} rel="noopener" fontWeight={fontWeight}>
      {children}
    </StyledLink>
  );
};

export default Link;
