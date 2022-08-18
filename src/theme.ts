import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'dark' | 'white';
    spacing: (units: number) => number;
    borderRadius: string;
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
    };
  }
}

const theme: DefaultTheme = {
  mode: 'dark',
  spacing: (units) => units * 8,
  borderRadius: '5px',
  colors: {
    text: { secondary: 'lightgray', primary: '#fff' },
    bg: {
      main: '#1a1f2d',
    },
    primary: '#386ff9',
    secondary: 'aqua',
  },
};

export default theme;
