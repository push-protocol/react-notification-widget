import React, { ReactNode } from "react";
import styled from "styled-components";
import { textSizes } from "../Text";

type LinkProps = {
  src?: string;
  onClick?: () => void;
  display?: "inline-block" | "block" | "flex";
  children?: ReactNode;
  fontWeight?: string | number;
  fontSize?: keyof typeof textSizes;
};

const StyledLink = styled.a<LinkProps>`
  text-decoration: none;
  cursor: ${({ src, onClick }) => (src || onClick ? "pointer" : undefined)};
  display: ${({ display }) => display};
  font-size: ${({ theme, fontSize }) =>
    fontSize ? `${textSizes[fontSize]}px` : theme.w.fontSize.md};
  color: ${({ theme }) => theme.w.colors.primary.light};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "inherit")};
  font-family: ${({ theme }) => theme.w.fontFamily};
`;

const Link = ({
  src,
  onClick,
  children,
  fontWeight,
  fontSize,
  display,
}: LinkProps) => {
  return (
    <StyledLink
      onClick={onClick}
      display={display}
      href={src}
      target={"_blank"}
      rel="noopener"
      fontWeight={fontWeight}
      fontSize={fontSize}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
