import { DefaultTheme } from 'styled-components';
import { LOCALSTORAGE_THEME_MODE_KEY } from '../global/const';
import { changeColorShade, adjustColor } from 'components/utils';

type MainColor = {
  light: string;
  main: string;
  dark: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    // theme is applied normally, under a "w" key to guard it, so that other apps using
    // styled-components will not have type conflicts
    w: {
      mode: 'dark' | 'light';
      uppercasePageTitles: boolean;
      spacing: (units: number) => number;
      fontFamily?: string;
      breakpoints: {
        mobile: number;
      };
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
        notificationDot?: {
          background?: string;
          text?: string;
        };
        bg: {
          main: string;
        };
        button: {
          text: string;
        };
        primary: MainColor;
        secondary: MainColor;
        text: {
          primary: string;
          secondary: string;
        };
        border: {
          main: string;
        };
        gray: {
          50: string;
          100: string;
          200: string;
          300: string;
          400: string;
          500: string;
        };
        light: {
          10: string;
          30: string;
          50: string;
          70: string;
          80: string;
          100: string;
        };
        dark: {
          10: string;
          30: string;
          50: string;
          70: string;
          80: string;
          100: string;
        };
        bell: {
          color: string;
        };
        error: {
          main: string;
        };
        success: {
          main: string;
        };
      };
    };
  }
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export type CustomTheme = {
  notificationDot?: {
    backgroundColor: string;
    textColor: string;
  };
  mode?: ThemeMode;
  primaryColor?: string;
  secondaryColor?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg';
  backgroundColor?: string;
  fontFamily?: string;
  bellColor?: string;
  textColor?: string;
  buttonTextColor?: string;
  mobileBreakpoint?: number;
  uppercasePageTitles?: boolean;
};

const br = (xs: string, sm: string, md: string, lg: string) => ({ xs, sm, md, lg });

const defaultTheme: DefaultTheme['w'] = {
  mode: 'dark',
  uppercasePageTitles: false,
  spacing: (units) => units * 8,
  borderRadius: br('4px', '6px', '8px', '12px'),
  fontSize: { sm: '12px', md: '14px', lg: '16px', xl: '18px' },
  fontFamily: 'inherit',
  breakpoints: {
    mobile: 600,
  },
  colors: {
    button: {
      text: '#ffffff',
    },
    text: {
      primary: 'rgba(255,255,255,0.9)',
      secondary: '#bfbfbf',
    },
    bg: {
      main: '#242C3C',
    },
    primary: {
      dark: '',
      main: '#3E64F0',
      light: '#5278FF',
    },
    secondary: {
      dark: '',
      main: '#C23EF0',
      light: '',
    },
    border: {
      main: '#353943',
    },
    light: {
      10: 'rgba(255, 255, 255, 0.1)',
      30: 'rgba(255, 255, 255, 0.3)',
      50: 'rgba(255, 255, 255, 0.5)',
      70: 'rgba(255, 255, 255, 0.7)',
      80: 'rgba(255, 255, 255, 0.8)',
      100: 'rgba(255, 255, 255, 1)',
    },
    dark: {
      10: 'rgba(0, 0, 0, 0.1)',
      30: 'rgba(0, 0, 0, 0.3)',
      50: 'rgba(0, 0, 0, 0.5)',
      70: 'rgba(0, 0, 0, 0.7)',
      80: 'rgba(0, 0, 0, 0.8)',
      100: 'rgba(0, 0, 0, 1)',
    },
    gray: {
      50: '#B1BCCE',
      100: '#646F82',
      200: '#576274',
      300: '#565E6E',
      400: '#4D5565',
      500: '#424A5A',
    },
    bell: {
      color: '#FCFCFC',
    },
    error: {
      main: '#FF0000',
    },
    success: {
      main: '#3ba417',
    },
  },
};

export const makeTheme = (customTheme?: CustomTheme): DefaultTheme => {
  localStorage.setItem(LOCALSTORAGE_THEME_MODE_KEY, customTheme?.mode || defaultTheme.mode);

  if (!customTheme) {
    return { w: defaultTheme };
  }

  return {
    w: {
      ...defaultTheme,
      uppercasePageTitles: !!customTheme.uppercasePageTitles,
      fontFamily: customTheme.fontFamily || defaultTheme.fontFamily,
      breakpoints: {
        mobile: customTheme.mobileBreakpoint || defaultTheme.breakpoints.mobile,
      },
      borderRadius: {
        ...getBorderRadius(customTheme.borderRadius),
      },
      colors: {
        ...defaultTheme.colors,
        notificationDot: {
          text: customTheme.notificationDot?.textColor,
          background: customTheme.notificationDot?.backgroundColor,
        },
        button: {
          text: customTheme.buttonTextColor || defaultTheme.colors.button.text,
        },
        text: {
          ...defaultTheme.colors.text,
          ...(customTheme.textColor && {
            primary: customTheme.textColor,
            secondary: adjustColor(customTheme.textColor, 0.7),
          }),
        },
        primary: {
          ...getMainColor('primary', customTheme.primaryColor),
        },
        secondary: {
          ...getMainColor('secondary', customTheme.secondaryColor),
        },
        bell: {
          ...defaultTheme.colors.bell,
          color: customTheme.bellColor || defaultTheme.colors.bell.color,
        },
        bg: {
          main: customTheme.backgroundColor || defaultTheme.colors.bg.main,
        },
      },
    },
  };
};

const getMainColor = (
  colorKey: 'primary' | 'secondary',
  color?: string
): DefaultTheme['w']['colors']['primary'] => {
  if (!color) return defaultTheme.colors[colorKey];

  return {
    light: changeColorShade(color, -30),
    main: color,
    dark: changeColorShade(color, 30),
  };
};

const getBorderRadius = (customBr: CustomTheme['borderRadius']) => {
  if (!customBr) return defaultTheme.borderRadius;

  const brMaps: Record<string, DefaultTheme['w']['borderRadius']> = {
    none: br('0', '0', '0', '0'),
    sm: defaultTheme.borderRadius,
    md: br('8px', '10px', '12px', '16px'),
    lg: br('12px', '14px', '16px', '20px'),
  };

  return brMaps[customBr];
};

export const mode = (dark: any, light: any) => {
  const mode = localStorage.getItem(LOCALSTORAGE_THEME_MODE_KEY);

  return mode === 'dark' ? dark : light;
};

export default defaultTheme;
