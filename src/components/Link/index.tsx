import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { textSizes } from 'components/Text';

const StyledLink = styled.a<{ fontWeight?: string | number; fontSize?: keyof typeof textSizes }>`
  text-decoration: none;
  font-size: ${({ theme, fontSize }) =>
    fontSize ? `${textSizes[fontSize]}px` : theme.fontSize.md};
  color: ${({ theme }) => theme.colors.primary.light};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'inherit')};
  font-family: ${({ theme }) => theme.fontFamily};
`;

type LinkProps = {
  src?: string;
  children?: ReactNode;
  fontWeight?: string | number;
  fontSize?: keyof typeof textSizes;
};

const Link = ({ src, children, fontWeight, fontSize }: LinkProps) => {
  return (
    <StyledLink
      href={src}
      target={'_blank'}
      rel="noopener"
      fontWeight={fontWeight}
      fontSize={fontSize}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
