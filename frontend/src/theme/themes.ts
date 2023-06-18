import { darken, lighten, transparentize } from 'polished';
import { breakpoints } from './common/breakpoints';
import { shadows } from './common/shadows';

import { BaseTheme, Colors, ExtendedTheme } from '@/theme/types';

const defaultColors: Colors = {
  transparent: 'transparent',
  almostBlack: '#111319',
  lightBlack: '#2F3336',
  almostWhite: '#E6E6E6',
  veryDarkBlue: '#08090C',
  slate: '#9BA6B2',
  slateLight: '#DAE1E9',
  slateDark: '#394351',
  smoke: '#F4F7FA',
  smokeLight: '#F9FBFC',
  smokeDark: '#E8EBED',
  white: '#FFFFFF',
  white05: 'rgba(255, 255, 255, 0.05)',
  white10: 'rgba(255, 255, 255, 0.1)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white75: 'rgba(255, 255, 255, 0.75)',
  black: '#000',
  black05: 'rgba(0, 0, 0, 0.05)',
  black10: 'rgba(0, 0, 0, 0.1)',
  black50: 'rgba(0, 0, 0, 0.50)',
  black75: 'rgba(0, 0, 0, 0.75)',
  accent: '#0366d6',
  yellow: '#EDBA07',
  warmGrey: '#EDF2F7',
  searchHighlight: '#FDEA9B',
  danger: '#f4345d',
  warning: '#f08a24',
  success: '#2f3336',
  info: '#a0d3e8',
  brand: {
    red: '#FF5C80',
    pink: '#FF4DFA',
    purple: '#9E5CF7',
    blue: '#3633FF',
    marine: '#2BC2FF',
    green: '#3ad984',
    yellow: '#F5BE31',
  },
};

const buildBaseTheme = (): BaseTheme => {
  // Usage      => theme.sp(1)           => "4px"
  //            => theme.sp(1,2)         => "4px 8px"
  //            => theme.sp(1,2,1,4)     => "4px 8px 1px 16px"
  // Promotes consistent spacing in application
  const sp = (...values: number[]) => values.map((value) => `${value * 4}px`).join(' ');

  const general = {
    backgroundTransition: 'background 100ms ease-in-out',
  };

  const font = {
    fontFamily:
      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen, Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    fontFamilyMono: "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
    fontWeight: 400,
  };

  const text = {
    textHighlight: '#FDEA9B',
    textHighlightForeground: defaultColors.almostBlack,
    accentText: defaultColors.white,
    selected: defaultColors.accent,
  };

  const notice = {
    noticeInfoBackground: defaultColors.brand.blue,
    noticeInfoText: defaultColors.almostBlack,
    noticeTipBackground: '#F5BE31',
    noticeTipText: defaultColors.almostBlack,
    noticeWarningBackground: '#d73a49',
    noticeWarningText: defaultColors.almostBlack,
    noticeSuccessBackground: defaultColors.brand.green,
    noticeSuccessText: defaultColors.almostBlack,
  };

  const table = { tableSelectedBackground: transparentize(0.8, defaultColors.accent) };

  return {
    ...general,
    ...font,
    ...text,
    ...notice,
    ...table,
    ...defaultColors,
    breakpoints,
    shadows,
    sp,
  };
};

export const buildLightTheme = (): ExtendedTheme => {
  const base = buildBaseTheme();

  const buttons = {
    buttonNeutralBackground: base.white,
    buttonNeutralText: base.almostBlack,
    buttonNeutralBorder: darken(0.15, base.white),
  };

  const dividers = {
    divider: base.slateLight,
  };

  const general = {
    background: base.white,
    secondaryBackground: base.warmGrey,
    link: base.accent,
    cursor: base.almostBlack,
    backdrop: 'rgba(0, 0, 0, 0.2)',
    commentBackground: base.warmGrey,
    mentionBackground: base.warmGrey,
    progressBarBackground: base.slateLight,
    scrollbarBackground: base.smoke,
    scrollbarThumb: darken(0.15, base.smokeDark),
  };

  const inputs = {
    inputBorder: base.slateLight,
    inputBorderFocused: base.slate,
  };

  const lists = {
    listItemHoverBackground: base.warmGrey,
  };

  const menus = {
    menuItemSelected: base.warmGrey,
    menuBackground: base.white,
    menuShadow: shadows[1],
  };

  const modals = {
    modalBackdrop: base.black10,
    modalBackground: base.white,
    modalShadow: shadows[2],
  };

  const sidebar = {
    sidebarBackground: base.warmGrey,
    sidebarActiveBackground: '#d7e0ea',
    sidebarControlHoverBackground: 'rgb(138 164 193 / 20%)',
    sidebarDraftBorder: darken('0.25', base.warmGrey),
    sidebarText: 'rgb(78, 92, 110)',
  };

  const tables = {
    tableDivider: base.smokeDark,
    tableSelected: base.accent,
  };

  const text = {
    text: base.almostBlack,
    textSecondary: base.slateDark,
    textTertiary: base.slate,
    textDiffInserted: base.almostBlack,
    textDiffInsertedBackground: 'rgba(18, 138, 41, 0.16)',
    textDiffDeleted: base.slateDark,
    textDiffDeletedBackground: '#ffebe9',
  };

  const toolbars = {
    toolbarHoverBackground: base.black,
    toolbarBackground: base.almostBlack,
    toolbarInput: base.white10,
    toolbarItem: base.white,
  };

  const tooltips = {
    tooltipBackground: base.almostBlack,
    tooltipText: base.white,
  };

  return {
    isDark: false,
    ...base,
    ...buttons,
    ...dividers,
    ...general,
    ...lists,
    ...inputs,
    ...menus,
    ...modals,
    ...sidebar,
    ...tables,
    ...text,
    ...toolbars,
    ...tooltips,
  };
};

export const buildDarkTheme = (): ExtendedTheme => {
  const base = buildBaseTheme();

  const buttons = {
    buttonNeutralBackground: base.almostBlack,
    buttonNeutralText: base.white,
    buttonNeutralBorder: base.slateDark,
  };

  const dividers = {
    divider: lighten(0.1, base.almostBlack),
    titleBarDivider: darken(0.4, base.slate),
  };

  const general = {
    background: base.almostBlack,
    secondaryBackground: base.black50,
    link: '#137FFB',
    cursor: base.almostWhite,
    backdrop: 'rgba(0, 0, 0, 0.5)',
    commentBackground: '#1f232e',
    mentionBackground: base.white10,
    progressBarBackground: base.slate,
    scrollbarBackground: base.black,
    scrollbarThumb: base.lightBlack,
  };

  const lists = { listItemHoverBackground: base.white10 };

  const inputs = {
    inputBorder: base.slateDark,
    inputBorderFocused: base.slate,
  };

  const menus = {
    menuItemSelected: lighten(0.1, '#1f2128'),
    menuBackground: '#1f2128',
    menuShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.08)',
  };

  const modals = {
    modalBackdrop: base.black50,
    modalBackground: '#1f2128',
    modalShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.08)',
  };

  const notices = {
    noticeInfoText: base.white,
    noticeTipText: base.white,
    noticeWarningText: base.white,
    noticeSuccessText: base.white,
  };

  const sidebar = {
    sidebarBackground: base.veryDarkBlue,
    sidebarActiveBackground: lighten(0.02, base.almostBlack),
    sidebarControlHoverBackground: base.white10,
    sidebarDraftBorder: darken('0.35', base.slate),
    sidebarText: base.slate,
  };

  const tables = { tableDivider: base.lightBlack, tableSelected: base.accent };

  const text = {
    text: base.almostWhite,
    textSecondary: lighten(0.1, base.slate),
    textTertiary: base.slate,
    textDiffInserted: base.almostWhite,
    textDiffInsertedBackground: 'rgba(63,185,80,0.3)',
    textDiffDeleted: darken(0.1, base.almostWhite),
    textDiffDeletedBackground: 'rgba(248,81,73,0.15)',
    placeholder: base.slateDark,
  };

  const toolbars = {
    toolbarHoverBackground: base.slate,
    toolbarBackground: base.white,
    toolbarInput: base.black10,
    toolbarItem: base.lightBlack,
  };

  const tooltips = {
    tooltipBackground: base.white,
    tooltipText: base.lightBlack,
  };

  return {
    isDark: true,
    ...base,
    ...buttons,
    ...dividers,
    ...general,
    ...lists,
    ...inputs,
    ...menus,
    ...modals,
    ...notices,
    ...sidebar,
    ...tables,
    ...text,
    ...toolbars,
    ...tooltips,
  };
};

export const light = buildLightTheme();
export const dark = buildDarkTheme();
