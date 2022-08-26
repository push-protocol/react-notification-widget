import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'dark' | 'white';
    spacing: (units: number) => number;
    borderRadius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    fontSize: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    colors: {
      bg: {
        main: string;
      };
      primary: string;
      secondary: string;
      text: {
        primary: string;
        secondary: string;
      };
      border: {
        main: string;
      };
    };
  }
}

const theme: DefaultTheme = {
  mode: 'dark',
  spacing: (units) => units * 8,
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '4px',
  },
  fontSize: { sm: '12px', md: '14px', lg: '16px', xl: '18px' },
  colors: {
    text: {
      primary: '#fff',
      secondary: '#748094',
    },
    bg: {
      main: '#242C3C',
    },
    primary: '#3E64F0',
    secondary: '#C23EF0',
    border: {
      main: '#353943',
    },
  },
};

export default theme;
