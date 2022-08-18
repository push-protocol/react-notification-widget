import { DefaultTheme, css } from 'styled-components';
import { Margins, Paddings } from './types';

const renderStringNumValue = (value?: string | number, spacing?: (units: number) => number) => {
  if (typeof value === 'number') {
    return `${spacing ? spacing(value) : value}px`;
  } else {
    return value;
  }
};

const conditionalRenderProp = (key: string, value?: string | number) => {
  if (value) {
    return `${key}: ${value}`;
  } else {
    return '';
  }
};

const adjustColor = (color: string, amount: number) => {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color: string) =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2)
      )
  );
};

const genSpaces = (
  theme: DefaultTheme,
  { p, pb, pl, pt, pr, m, mt, mb, ml, mr }: Margins & Paddings
) => {
  const value = css`
    ${conditionalRenderProp('margin', renderStringNumValue(m, theme.spacing))};
    ${conditionalRenderProp('margin-left', renderStringNumValue(ml, theme.spacing))};
    ${conditionalRenderProp('margin-right', renderStringNumValue(mr, theme.spacing))};
    ${conditionalRenderProp('margin-top', renderStringNumValue(mt, theme.spacing))};
    ${conditionalRenderProp('margin-bottom', renderStringNumValue(mb, theme.spacing))};
    ${conditionalRenderProp('padding', renderStringNumValue(p, theme.spacing))};
    ${conditionalRenderProp('padding-top', renderStringNumValue(pt, theme.spacing))};
    ${conditionalRenderProp('padding-bottom', renderStringNumValue(pb, theme.spacing))};
    ${conditionalRenderProp('padding-right', renderStringNumValue(pr, theme.spacing))};
    ${conditionalRenderProp('padding-left', renderStringNumValue(pl, theme.spacing))};
  `;

  return value.join('');
};

export { adjustColor, genSpaces, renderStringNumValue, conditionalRenderProp };
