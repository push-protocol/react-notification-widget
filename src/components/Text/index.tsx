import styled from 'styled-components';
import { Margins, Paddings } from '../types';
import { genSpaces } from '../utils';

const sizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 24,
  '3xl': 32,
};

type TextProps = {
  size?: keyof typeof sizes;
  color?: 'primary' | 'secondary';
} & Margins &
  Paddings;

const Text = styled.p<TextProps>(({ theme, size, color, ...rest }) => ({
  color: color ? theme.colors.text[color] : theme.colors.text.primary,
  fontSize: size ? sizes[size] : sizes.md,
  ...genSpaces(theme, rest),
}));

export default Text;
