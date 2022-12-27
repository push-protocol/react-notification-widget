import { DefaultTheme, css } from 'styled-components';
import { StandardPropertiesHyphen } from 'csstype';
import { Margins, Paddings } from './types';

const renderStringNumValue = (value?: string | number, spacing?: (units: number) => number) => {
  if (typeof value === 'number') {
    return `${spacing ? spacing(value) : value}px`;
  } else {
    return value;
  }
};

const conditionalRenderProp = (key: keyof StandardPropertiesHyphen, value?: string | number) => {
  if (value) {
    return `${key}: ${value}`;
  } else {
    return '';
  }
};

const changeColorShade = (color: string, amount: number) => {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color: string) =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2)
      )
  );
};

const adjustColor = (color: string, opacity: number) => {
  let c: any;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    c = color.substring(1).split('');

    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }

    c = `0x${c.join('')}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')} ,${opacity})`;
  }

  throw new Error('Bad Hex');
};

const genSpaces = (
  theme: DefaultTheme,
  { p, pb, pl, pt, pr, m, mt, mb, ml, mr }: Margins & Paddings
) => {
  const value = css`
    ${conditionalRenderProp('margin', renderStringNumValue(m, theme.w.spacing))};
    ${conditionalRenderProp('margin-left', renderStringNumValue(ml, theme.w.spacing))};
    ${conditionalRenderProp('margin-right', renderStringNumValue(mr, theme.w.spacing))};
    ${conditionalRenderProp('margin-top', renderStringNumValue(mt, theme.w.spacing))};
    ${conditionalRenderProp('margin-bottom', renderStringNumValue(mb, theme.w.spacing))};
    ${conditionalRenderProp('padding', renderStringNumValue(p, theme.w.spacing))};
    ${conditionalRenderProp('padding-top', renderStringNumValue(pt, theme.w.spacing))};
    ${conditionalRenderProp('padding-bottom', renderStringNumValue(pb, theme.w.spacing))};
    ${conditionalRenderProp('padding-right', renderStringNumValue(pr, theme.w.spacing))};
    ${conditionalRenderProp('padding-left', renderStringNumValue(pl, theme.w.spacing))};
  `;

  return value.join('');
};

export { adjustColor, genSpaces, renderStringNumValue, conditionalRenderProp, changeColorShade };
