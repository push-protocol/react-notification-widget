import styled from 'styled-components';
import { Margins, Paddings } from '../types';
import { conditionalRenderProp, genSpaces, renderStringNumValue } from '../utils';

export const textSizes = {
  xs: 10,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 24,
  '3xl': 32,
};

type ColorKeys = 'primary' | 'secondary';

type TextProps = {
  size?: keyof typeof textSizes;
  color?: ColorKeys | string;
  weight?: string | number;
  opacity?: number;
  align?: 'left' | 'center' | 'right';
  fontFamily?: string;
  flexBasis?: number;
} & Margins &
  Paddings;

const Text = styled.p<TextProps>`
  ${({ theme, size, color, flexBasis, weight, opacity, align, fontFamily, ...rest }) => `
    ${conditionalRenderProp(
      'color',
      color ? theme.colors.text[color as ColorKeys] || color : theme.colors.text.primary
    )};
    ${conditionalRenderProp(
      'font-size',
      renderStringNumValue(size ? textSizes[size] : textSizes.md)
    )};
    ${conditionalRenderProp('font-weight', weight)};
    ${conditionalRenderProp('font-family', fontFamily || theme.fontFamily || 'inherit')};
    ${conditionalRenderProp('text-align', align)};
    ${conditionalRenderProp('opacity', opacity)};
    ${conditionalRenderProp('flex-basis', flexBasis)};
    ${genSpaces(theme, rest)}
  `};
`;

export default Text;
