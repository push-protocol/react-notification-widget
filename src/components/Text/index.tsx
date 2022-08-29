import styled from 'styled-components';
import { Margins, Paddings } from '../types';
import { conditionalRenderProp, adjustColor, genSpaces, renderStringNumValue } from '../utils';

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
  weight?: string | number;
  opacity?: number;
  align?: 'left' | 'center' | 'right';
} & Margins &
  Paddings;

const Text = styled.p<TextProps>`
  ${({ theme, size, color, weight, opacity, align, ...rest }) => `
    ${conditionalRenderProp(
      'color',
      color
        ? opacity
          ? adjustColor(theme.colors.text[color], opacity)
          : theme.colors.text[color]
        : theme.colors.text.primary
    )};
    ${conditionalRenderProp('font-size', renderStringNumValue(size ? sizes[size] : sizes.md))};
    ${conditionalRenderProp('font-weight', weight)};
    ${conditionalRenderProp('text-align', align)};
    ${genSpaces(theme, rest)}
  `};
`;

export default Text;
