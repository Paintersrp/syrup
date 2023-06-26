import { darken, lighten, transparentize } from 'polished';

import { animations, breakpoints, shadows } from '@/theme/common';
import { BaseTheme, ExtendedTheme } from '@/theme/types';
import { genColorSet } from '@/theme/utils';

export const defaultColors: any = {
  ...genColorSet('primary', '#2e3b55', 0.1, 0.1),
  ...genColorSet('secondary', '#ff8c00', 0.2, 0.05),
  ...genColorSet('tertiary', '#9E5CF7', 0.2, 0.05),
  ...genColorSet('quaternary', '#3ad984', 0.2, 0.2),
  ...genColorSet('error', '#f44336', 0.05, 0.15),
  ...genColorSet('warning', '#f08a24', 0.1, 0.1),
  ...genColorSet('success', '#4caf50', 0.1, 0.1),
  ...genColorSet('info', '#1976d2', 0.2, 0.15),
  ...genColorSet('slate', '#444f60', 0.1, 0.1),
  ...genColorSet('smoke', '#dbe5ef', 0.05, 0.1),

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
  minVisible: 'rgba(34, 34, 34, 0.1)',
  disabled: 'rgba(34, 34, 34, 0.38)',
  grey: 'rgba(0, 0, 0, 0.50)',
  charcoal: 'rgba(0,0,0,0.75)',
  background: '#f5f5f5',
};

const buildBaseTheme = (): BaseTheme => {
  const sp = (...values: number[]) => values.map((value) => `${value * 4}px`).join(' ');

  const general = {
    backgroundTransition: 'background 100ms ease-in-out',
    imageBorderRadius: 5,
  };

  const image = {
    borderRadius: 5,
    boxShadow: shadows[1],
    header: {
      borderBottomLeftRadius: '0px !important',
      borderBottomRightRadius: '0px !important',
    },
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

  const menu = {
    menuBackground: defaultColors.light,
    menuBorder: `1px solid ${defaultColors.lightDark}`,
  };

  const errorNotice = {
    errorNoticeBackground: lighten(0.3, defaultColors.errorLight),
    errorNoticeBorder: `1px solid ${lighten(0.15, defaultColors.errorLight)}`,
  };

  const table = {
    tableSelectedBackground: transparentize(0.8, defaultColors.accent),
  };

  const flex = {
    cc: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return {
    ...general,
    ...font,
    ...text,
    ...notice,
    ...errorNotice,
    ...table,
    ...defaultColors,
    ...menu,
    image,
    flex,
    anim: animations,
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
    backdrop: base.grey,
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
