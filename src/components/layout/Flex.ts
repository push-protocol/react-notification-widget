import styled from 'styled-components';
import { conditionalRenderProp, genSpaces, renderStringNumValue } from '../utils';
import { Paddings, Margins } from '../types';

type PropsT = {
  height?: string | number;
  width?: string | number;
  direction?: 'column' | 'row';
  gap?: number | string;
  alignItems?: 'space-between' | 'start' | 'end' | 'center';
  justifyContent?: 'space-between' | 'start' | 'end' | 'center';
  bg?: string;
} & Paddings &
  Margins;

const Flex = styled.div<PropsT>`
  ${({ theme, direction, height, width, gap, justifyContent, alignItems, bg, ...rest }) => `
    display: flex;
    ${conditionalRenderProp('background-color', bg)};
    ${conditionalRenderProp('height', renderStringNumValue(height))};
    ${conditionalRenderProp('width', renderStringNumValue(width))};
    ${conditionalRenderProp('flex-direction', direction)};
    ${conditionalRenderProp('gap', renderStringNumValue(gap, theme.spacing))};
    ${conditionalRenderProp('align-items', alignItems)};
    ${conditionalRenderProp('justify-content', justifyContent)};
    ${genSpaces(theme, rest)}
  `};
`;

export default Flex;
