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
        20: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
      };
      bell: {
        background: string;
        hoverBackground: string;
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
      20: '#B1BCCE',
      100: '#646F82',
      200: '#576274',
      300: '#565E6E',
      400: '#4D5565',
      500: '#424A5A',
    },
    bell: {
      background: '#2F3747',
      hoverBackground:
        'linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), #2F3747',
    },
  },
};

export default theme;
