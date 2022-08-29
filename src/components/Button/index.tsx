import styled from 'styled-components';
import { Margins, Paddings } from '../types';
import { genSpaces, conditionalRenderProp, renderStringNumValue } from '../utils';

type ButtonProps = {
  variant?: 'gray' | 'primary' | 'outlined';
  height?: string | number;
  width?: string | number;
} & Margins &
  Paddings;

const Button = styled.button<ButtonProps>`
  ${({ theme, variant = 'primary', width = '100%', height = '39px', ...rest }) => `
    &:hover {
      background: ${variant === 'outlined' ? undefined : theme.colors[variant].light};
      borderColor: ${variant === 'outlined' ? undefined : theme.colors[variant].light};
    };
    &:active {
      transform: translateY(1px);
    };
    transition: .1s background ease, .1s transform ease;
    background: ${variant === 'outlined' ? 'transparent' : theme.colors[variant].dark};
    ${conditionalRenderProp('border-radius', theme.borderRadius.md)};
    cursor: pointer;
    border: none;
    font-weight: 600;
    font-size: ${theme.fontSize.lg};
    padding: ${theme.spacing(1)}px ${theme.spacing(3)}px;
    color: ${theme.colors.text.primary};
    width: ${renderStringNumValue(width)};
    height: ${renderStringNumValue(height)};
    ${genSpaces(theme, rest)}
  `};
`;

export default Button;
