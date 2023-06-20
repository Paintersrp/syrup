import { darken, lighten, transparentize } from 'polished';

import { breakpoints } from '@/theme/common/breakpoints';
import { shadows } from '@/theme/common/shadows';
import { Theme, ExtendedTheme } from '@/theme/types';
import { generateColorSet } from '@/theme/utils/generate';

export const defaultColors: any = {
  ...generateColorSet('primary', '#2e3b55', 0.1, 0.1),
  ...generateColorSet('secondary', '#ff8c00', 0.2, 0.05),
  ...generateColorSet('tertiary', '#9E5CF7', 0.2, 0.05),
  ...generateColorSet('quaternary', '#3ad984', 0.2, 0.2),
  ...generateColorSet('error', '#f44336', 0.05, 0.15),
  ...generateColorSet('warning', '#f08a24', 0.1, 0.1),
  ...generateColorSet('success', '#4caf50', 0.1, 0.1),
  ...generateColorSet('info', '#1976d2', 0.2, 0.15),
  ...generateColorSet('slate', '#444f60', 0.1, 0.1),
  ...generateColorSet('smoke', '#dbe5ef', 0.05, 0.1),

  dark: '#222',
  darkLight: lighten(0.1, '#222'),
  darker: '#000',

  light: '#f5f5f5',
  lighter: '#fff',
  lightDark: darken(0.05, '#f5f5f5'),

  transparent: 'transparent',
  accent: '#0366d6',
  yellow: '#EDBA07',
  textHighlight: '#FDEA9B',
  grey: 'rgba(0, 0, 0, 0.50)',
  charcoal: 'rgba(0,0,0,0.75)',
};

const buildBaseTheme = (): Theme => {
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
    textHighlightForeground: defaultColors.dark,
    accentText: defaultColors.light,
    selected: defaultColors.accent,
  };

  const notice = {
    noticeInfoBackground: defaultColors.infoLight,
    noticeInfoText: defaultColors.dark,
    noticeTipBackground: '#F5BE31',
    noticeTipText: defaultColors.dark,
    noticeWarningBackground: lighten(0.2, defaultColors.errorLight),
    noticeWarningText: defaultColors.dark,
    noticeSuccessBackground: defaultColors.quaternary,
    noticeSuccessText: defaultColors.dark,
  };

  const errorNotice = {
    errorNoticeBackground: lighten(0.3, defaultColors.errorLight),
    errorNoticeBorder: `1px solid ${lighten(0.15, defaultColors.errorLight)}`,
  };

  const table = { tableSelectedBackground: transparentize(0.8, defaultColors.accent) };

  return {
    ...general,
    ...font,
    ...text,
    ...notice,
    ...errorNotice,
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
    buttonNeutralBackground: base.light,
    buttonNeutralText: base.dark,
    buttonNeutralBorder: darken(0.15, base.light),
  };

  const dividers = {
    divider: base.slateLight,
  };

  const general = {
    background: base.light,
    secondaryBackground: base.smokeLight,
    link: base.accent,
    cursor: base.dark,
    backdrop: 'rgba(0, 0, 0, 0.2)',
    commentBackground: base.smokeLight,
    mentionBackground: base.smokeLight,
    progressBarBackground: base.slateLight,
    scrollbarBackground: base.smoke,
    scrollbarThumb: darken(0.15, base.smokeDark),
  };

  const inputs = {
    inputBorder: base.slateLight,
    inputBorderFocused: base.slate,
  };

  const lists = {
    listItemHoverBackground: base.smokeLight,
  };

  const menus = {
    menuItemSelected: base.smokeLight,
    menuBackground: base.light,
    menuShadow: shadows[1],
  };

  const modals = {
    modalBackdrop: base.lightDark,
    modalBackground: base.light,
    modalShadow: shadows[2],
  };

  const sidebar = {
    sidebarBackground: base.smokeLight,
    sidebarActiveBackground: '#d7e0ea',
    sidebarControlHoverBackground: 'rgb(138 164 193 / 20%)',
    sidebarDraftBorder: darken('0.25', base.smokeLight),
    sidebarText: 'rgb(78, 92, 110)',
  };

  const tables = {
    tableDivider: base.smokeDark,
    tableSelected: base.accent,
  };

  const text = {
    text: base.dark,
    textSecondary: base.slateDark,
    textTertiary: base.slate,
    textDiffInserted: base.dark,
    textDiffInsertedBackground: 'rgba(18, 138, 41, 0.16)',
    textDiffDeleted: base.slateDark,
    textDiffDeletedBackground: '#ffebe9',
  };

  const toolbars = {
    toolbarHoverBackground: base.dark,
    toolbarBackground: base.dark,
    toolbarInput: base.lightDark,
    toolbarItem: base.light,
  };

  const tooltips = {
    tooltipBackground: base.dark,
    tooltipText: base.light,
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
    buttonNeutralBackground: base.dark,
    buttonNeutralText: base.light,
    buttonNeutralBorder: base.slateDark,
  };

  const dividers = {
    divider: lighten(0.1, base.dark),
    titleBarDivider: darken(0.4, base.slate),
  };

  const general = {
    background: base.dark,
    secondaryBackground: base.grey,
    link: '#137FFB',
    cursor: base.lightDark,
    backdrop: 'rgba(0, 0, 0, 0.5)',
    commentBackground: '#1f232e',
    mentionBackground: base.lightDark,
    progressBarBackground: base.slate,
    scrollbarBackground: base.dark,
    scrollbarThumb: base.lightDark,
  };

  const lists = { listItemHoverBackground: base.lightDark };

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
    modalBackdrop: base.grey,
    modalBackground: '#1f2128',
    modalShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.08)',
  };

  const notices = {
    noticeInfoText: base.light,
    noticeTipText: base.light,
    noticeWarningText: base.light,
    noticeSuccessText: base.light,
  };

  const sidebar = {
    sidebarBackground: base.slateDark,
    sidebarActiveBackground: lighten(0.02, base.dark),
    sidebarControlHoverBackground: base.lightDark,
    sidebarDraftBorder: darken('0.35', base.slate),
    sidebarText: base.slate,
  };

  const tables = { tableDivider: base.lightDark, tableSelected: base.accent };

  const text = {
    text: base.lightDark,
    textSecondary: lighten(0.1, base.slate),
    textTertiary: base.slate,
    textDiffInserted: base.lightDark,
    textDiffInsertedBackground: 'rgba(63,185,80,0.3)',
    textDiffDeleted: darken(0.1, base.lightDark),
    textDiffDeletedBackground: 'rgba(248,81,73,0.15)',
    placeholder: base.slateDark,
  };

  const toolbars = {
    toolbarHoverBackground: base.slate,
    toolbarBackground: base.light,
    toolbarInput: base.lightDark,
    toolbarItem: base.darkLight,
  };

  const tooltips = {
    tooltipBackground: base.light,
    tooltipText: base.darkLight,
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
