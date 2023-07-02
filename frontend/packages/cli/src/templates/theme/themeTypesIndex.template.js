/**
 * @description
 * Returns the template for generating the index file in the theme/types directory.
 *
 * @returns {string} - The types index template.
 */
export const ThemeTypesIndexTemplate = () =>
  `
  import { AnimationStyles, Breakpoints, Colors } from '../common';
  import { shadows, Shadows } from '../common/shadows'; 
  
  export interface BaseTheme extends Colors {
    anim: AnimationStyles;
    bp: Breakpoints;
    dividerLight: string;
    dividerNormal: string;
    dividerDark: string;
    dividerMin: string;
    dividerDrawer: string;
    errorNoticeBackground: string;
    errorNoticeBorder: string;
    fontFamily: string;
    fontFamilyMono: string;
    imageBorderRadius: string | number;
    imageBoxShadow: any;
    imageBorderBottomLeftRadius: string | number;
    imageBorderBottomRightRadius: string | number;
    menuItemSelected: string;
    menuBackground: string;
    menuBorder: string;
    menuShadow: typeof shadows | string;
    shadows: Shadows;
    sp: (...values: number[]) => string;
    tableSelectedBackground: string;
    tableHover: string;
    textHighlight: string;
    textHighlightForeground: string;
    textAccent: string;
    textSelected: string;
    zIndex: Record<string, number>;
  }
  
  export interface ExtendedTheme extends BaseTheme {
    isDark: true | false;
    buttonNeutralBackground?: string;
    buttonNeutralText?: string;
    buttonNeutralBorder?: string;
  
    background: string;
    secondaryBackground: string;
    link: string;
  
    inputBorder: string;
    inputBorderFocused: string;
  
    listItemHoverBackground: string;
  
    modalBackdrop: string;
    modalBackground: string;
    modalShadow: string;
  
    tableDivider: string;
    tableSelected: string;
  
    text: string;
    textSecondary: string;
    textTertiary: string;
  
    tooltipBackground: string;
    tooltipText: string;
  }
  
  export type { Breakpoints };  
`;
