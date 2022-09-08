import styled, { css, DefaultTheme } from 'styled-components';
import { Margins, Paddings } from '../types';
import { genSpaces, renderStringNumValue, adjustColor } from '../utils';

const fontSizes = {
  sm: '12px',
  md: '16px',
};

type ButtonVariant = 'gray' | 'primary' | 'outlined';

type ButtonProps = {
  variant?: ButtonVariant;
  fontSize?: keyof typeof fontSizes;
  height?: string | number;
  width?: string | number;
  borderRadius?: keyof DefaultTheme['borderRadius'];
} & Margins &
  Paddings;

const variantStyles = (variant = 'primary', theme: DefaultTheme): any =>
  ({
    primary: css`
      background: ${theme.colors.primary.main};
      &:hover {
        background: ${adjustColor(theme.colors.primary.main, 0.8)};
        border-color: ${adjustColor(theme.colors.primary.main, 0.8)};
      }
    `,
    gray: css`
      background: ${theme.colors.gray[500]};
      &:hover {
        background: ${theme.colors.gray[300]};
        border-color: ${theme.colors.gray[300]};
      }
    `,
    outlined: css`
      background-color: transparent;
    `,
  }[variant]);

const Button = styled.button<ButtonProps>`
  ${({
    theme,
    variant = 'primary',
    width = '100%',
    height = '39px',
    fontSize = 'md',
    borderRadius = 'md',
    ...rest
  }) => `
    &:active {
      transform: translateY(1px);
    };
    transition: .1s background ease, .1s transform ease;
    border-radius: ${theme.borderRadius[borderRadius]};
    cursor: pointer;
    border: none;
    font-weight: 600;
    font-size: ${fontSizes[fontSize]};
    padding: ${theme.spacing(1)}px ${theme.spacing(3)}px;
    color: ${theme.colors.text.primary};
    width: ${renderStringNumValue(width)};
    height: ${renderStringNumValue(height)};
    ${variantStyles(variant, theme).join('')}
    ${genSpaces(theme, rest)}
  `};
`;

export default Button;
