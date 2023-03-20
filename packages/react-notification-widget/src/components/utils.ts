import { DefaultTheme, css } from 'styled-components';
import { StandardPropertiesHyphen } from 'csstype';
import { Margins, Paddings } from './types';

const valToPx = (value?: string | number, spacing?: (units: number) => number) => {
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

    if (c.length === 3) {
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
  // default the margin and padding to 0 to avoid issues with user-agent applied css
  const value = css`
    ${conditionalRenderProp('margin', valToPx(m || 0, theme.w.spacing))};
    ${conditionalRenderProp('margin-left', valToPx(ml, theme.w.spacing))};
    ${conditionalRenderProp('margin-right', valToPx(mr, theme.w.spacing))};
    ${conditionalRenderProp('margin-top', valToPx(mt, theme.w.spacing))};
    ${conditionalRenderProp('margin-bottom', valToPx(mb, theme.w.spacing))};
    ${conditionalRenderProp('padding', valToPx(p || 0, theme.w.spacing))};
    ${conditionalRenderProp('padding-top', valToPx(pt, theme.w.spacing))};
    ${conditionalRenderProp('padding-bottom', valToPx(pb, theme.w.spacing))};
    ${conditionalRenderProp('padding-right', valToPx(pr, theme.w.spacing))};
    ${conditionalRenderProp('padding-left', valToPx(pl, theme.w.spacing))};
  `;

  return value.join('');
};

export { adjustColor, genSpaces, valToPx, conditionalRenderProp, changeColorShade };
