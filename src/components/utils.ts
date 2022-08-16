import { Theme } from '@emotion/react';
import { Margins, Paddings } from './types';

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

const spacingOrConstant = (spacingFunc: any, numOrStr?: number | string) =>
  typeof numOrStr === 'number' ? spacingFunc(numOrStr) : numOrStr;

const genSpaces = (theme: Theme, { p, pb, pl, pt, pr, m, mt, mb, ml, mr }: Margins & Paddings) => ({
  margin: spacingOrConstant(theme.spacing, m),
  marginLeft: spacingOrConstant(theme.spacing, ml),
  marginRight: spacingOrConstant(theme.spacing, mr),
  marginTop: spacingOrConstant(theme.spacing, mt),
  marginBottom: spacingOrConstant(theme.spacing, mb),
  ...(p && { padding: spacingOrConstant(theme.spacing, p) }),
  paddingTop: spacingOrConstant(theme.spacing, pt),
  paddingBottom: spacingOrConstant(theme.spacing, pb),
  paddingRight: spacingOrConstant(theme.spacing, pr),
  paddingLeft: spacingOrConstant(theme.spacing, pl),
});

export { adjustColor, genSpaces };
