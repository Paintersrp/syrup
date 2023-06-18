type ColorValue = string;

export interface ColorPalette {
  main: ColorValue;
  light: ColorValue;
  dark: ColorValue;
  contrastText: ColorValue;
  hover: ColorValue;
}

export interface Colors {
  primary: ColorPalette;
  secondary: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
  info: ColorPalette;
  text: {
    dark: ColorValue;
    light: ColorValue;
    primary: ColorValue;
    secondary: ColorValue;
    disabled: ColorValue;
    min: ColorValue;
    hint: ColorValue;
    hover: ColorValue;
  };
  action: {
    active: ColorValue;
    hover: ColorValue;
    hoverLight: ColorValue;
    selected: ColorValue;
    disabled: ColorValue;
    disabledBackground: ColorValue;
  };
  background: {
    default: ColorValue;
    paper: ColorValue;
    light: ColorValue;
    hover: ColorValue;
  };
  [key: string]: ColorPalette | any;
}

export const colors: Colors = {
  primary: {
    main: '#2e3b55',
    light: '#6b7c9b',
    dark: '#00152e',
    contrastText: '#fff',
    hover: '#6b7c9b5a',
  },
  secondary: {
    main: '#ff8c00',
    light: '#ffd04d',
    dark: '#c75e00',
    contrastText: '#fff',
    hover: '#ff8c005a',
  },
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: '#fff',
    hover: '#4caf505a',
  },
  warning: {
    light: '#ffd54f',
    main: '#ffeb3b',
    dark: '#f57f17',
    contrastText: '#222',
    hover: '#ffeb3b5a',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
    hover: '#f443365a',
  },
  info: {
    light: '#64b5f6',
    main: '#3f51b5',
    dark: '#1976d2',
    contrastText: '#fff',
    hover: '#3f51b55a',
  },
  text: {
    dark: '#222',
    light: '#fff',
    primary: 'rgba(0, 0, 0, 1)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    min: 'rgba(0, 0, 0, 0.19)',
    hint: 'rgba(0, 0, 0, 0.38)',
    hover: '#2225a',
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(121, 134, 203 , 0.75)',
    hoverLight: 'rgba(121, 134, 203 , 0.10)',
    selected: 'rgba(255, 255, 255, 0.22)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
  background: {
    default: '#f5f5f5',
    paper: '#f5f5f5',
    light: '#f5f5f5',
    hover: '#f5f5f55a',
  },
};
