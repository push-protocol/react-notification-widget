import styled from 'styled-components';
import { genSpaces } from '../utils';
import { Paddings, Margins } from '../types';

type PropsT = {
  height?: string | number;
  width?: string | number;
  direction?: 'column' | 'row';
  gap?: number | string;
  alignItems?: 'space-between' | 'start' | 'end' | 'center';
  justifyContent?: 'space-between' | 'start' | 'end' | 'center';
} & Paddings &
  Margins;

const Flex = styled.div<PropsT>(
  ({ theme, direction, height, width, gap, justifyContent, alignItems, ...rest }) => ({
    backgroundColor: theme.colors.bg.main,
    display: 'flex',
    height,
    width,
    flexDirection: direction,
    gap: typeof gap === 'number' ? theme.spacing(gap) : gap,
    ...genSpaces(theme, rest),
    alignItems,
    justifyContent,
  })
);

export default Flex;
