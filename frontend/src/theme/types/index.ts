import { Breakpoints } from '../common';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;

  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  tertiary: string;
  tertiaryLight: string;
  tertiaryDark: string;

  quaternary: string;
  quaternaryLight: string;
  quaternaryDark: string;

  error: string;
  errorLight: string;
  errorDark: string;

  warning: string;
  warningLight: string;
  warningDark: string;

  success: string;
  successLight: string;
  successDark: string;

  info: string;
  infoLight: string;
  infoDark: string;

  slate: string;
  slateLight: string;
  slateDark: string;

  smoke: string;
  smokeLight: string;
  smokeDark: string;

  dark: string;
  darkLight: string;
  darker: string;

  light: string;
  lighter: string;
  lightDark: string;

  transparent: string;
  accent: string;
  yellow: string;
  textHighlight: string;
  grey: string;
  charcoal: string;
}

export interface Theme extends ThemeColors {
  breakpoints: Breakpoints;
  shadows: Record<number, string>;
  sp: (...values: number[]) => string;
  backgroundTransition: string;
  fontFamily: string;
  fontFamilyMono: string;
  fontWeight: number;
  textHighlight: string;
  textHighlightForeground: string;
  accentText: string;
  selected: string;
  noticeInfoBackground: string;
  noticeInfoText: string;
  noticeTipBackground: string;
  noticeTipText: string;
  noticeWarningBackground: string;
  noticeWarningText: string;
  noticeSuccessBackground: string;
  noticeSuccessText: string;
  tableSelectedBackground: string;
}

export interface ExtendedTheme extends Theme {
  isDark: true | false;
  buttonNeutralBackground?: string;
  buttonNeutralText?: string;
  buttonNeutralBorder?: string;
  divider: string;
  background: string;
  secondaryBackground: string;
  link: string;
  cursor: string;
  backdrop: string;
  commentBackground: string;
  mentionBackground: string;
  progressBarBackground: string;
  scrollbarBackground: string;
  scrollbarThumb: string;
  inputBorder: string;
  inputBorderFocused: string;
  listItemHoverBackground: string;
  menuItemSelected: string;
  menuBackground: string;
  menuShadow: string;
  modalBackdrop: string;
  modalBackground: string;
  modalShadow: string;
  noticeInfoText: string;
  noticeTipText: string;
  noticeWarningText: string;
  noticeSuccessText: string;
  sidebarBackground: string;
  sidebarActiveBackground: string;
  sidebarControlHoverBackground: string;
  sidebarDraftBorder: string;
  sidebarText: string;
  tableDivider: string;
  tableSelected: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDiffInserted: string;
  textDiffInsertedBackground: string;
  textDiffDeleted: string;
  textDiffDeletedBackground: string;
  toolbarHoverBackground: string;
  toolbarBackground: string;
  toolbarInput: string;
  toolbarItem: string;
  tooltipBackground: string;
  tooltipText: string;
}

export type { Breakpoints };
