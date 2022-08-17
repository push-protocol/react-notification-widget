import styled from 'styled-components';
import { Margins, Paddings } from '../types';
import { genSpaces, adjustColor } from '../utils';

type ButtonProps = { variant?: 'outlined' } & Margins & Paddings;

const Button = styled.button<ButtonProps>(({ theme, variant, ...rest }) => ({
  '&:hover': {
    background: variant === 'outlined' ? undefined : adjustColor(theme.colors.primary, -20),
    borderColor: adjustColor(theme.colors.primary, -20),
    transform: 'translateY(1px)',
  },
  transition: '.2s background ease, .2s transform ease',
  background: variant === 'outlined' ? 'transparent' : theme.colors.primary,
  borderRadius: theme.borderRadius,
  cursor: 'pointer',
  border: `1px solid ${theme.colors.primary}`,
  padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  color: theme.colors.text.primary,
  ...genSpaces(theme, rest),
}));

export default Button;
