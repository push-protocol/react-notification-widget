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
      primary: {
        dark: string;
        light: string;
        lighter: string;
      };
      secondary: {
        dark: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      border: {
        main: string;
      };
      gray: {
        darker: string;
        dark: string;
        light: string;
        lighter: string;
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
      secondary: '#E7E7E7',
    },
    bg: {
      main: '#242C3C',
    },
    primary: {
      dark: '#3E64F0',
      light: '#5278FF',
      lighter: '#6481F2',
    },
    secondary: {
      dark: '#C23EF0',
    },
    border: {
      main: '#353943',
    },
    gray: {
      darker: '#4D5565',
      dark: '#424A5A',
      light: '#565E6E',
      lighter: '#576274',
    },
  },
};

export default theme;
