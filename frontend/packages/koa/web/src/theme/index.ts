import { darken, lighten, transparentize } from 'polished';
import { animations, breakpoints, colors as defaultColors, shadows as shadowSet } from './common';
import { BaseTheme, ExtendedTheme } from './types';

const buildBaseTheme = (): BaseTheme => {
  const anim = animations;
  const bp = breakpoints;
  const colors = defaultColors;

  const dividers = {
    dividerLight: colors.slateLight,
    dividerNormal: colors.slate,
    dividerDark: colors.slateDark,
    dividerMin: colors.minVisible,
    dividerDrawer: colors.drawerLight,
  };

  const errorNotice = {
    errorNoticeBackground: lighten(0.3, colors.errorLight),
    errorNoticeBorder: `1px solid ${lighten(0.15, colors.errorLight)}`,
  };

  const font = {
    fontFamily:
      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen, Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    fontFamilyMono: "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
  };

  const image = {
    imageBorderRadius: 5,
    imageBoxShadow: shadowSet[1],
    imageBorderBottomLeftRadius: '0px !important',
    imageBorderBottomRightRadius: '0px !important',
  };

  // Implement
  const menu = {
    menuItemSelected: colors.smoke,
    menuBackground: colors.light,
    menuBorder: `1px solid ${colors.lightDark}`,
    menuShadow: shadowSet[1],
  };

  const shadows = shadowSet;
  const sp = (...values: number[]) => values.map((value) => `${value * 4}px`).join(' ');

  const table = {
    tableHover: lighten(0.015, colors.light),
    tableSelectedBackground: transparentize(0.8, colors.accent),
  };

  const text = {
    textHighlight: '#FDEA9B',
    textHighlightForeground: colors.dark,
    textAccent: colors.accent,
    textSelected: colors.accent,
  };

  const zIndex = {
    modal: 10,
    drawer: 10,
    alert: 8,
    tooltip: 6,
    navbar: 4,
  };

  return {
    anim,
    bp,
    ...colors,
    ...dividers,
    ...errorNotice,
    ...font,
    ...image,
    ...menu,
    shadows,
    sp,
    ...table,
    ...text,
    zIndex,
  };
};

export const buildLightTheme = (): ExtendedTheme => {
  const base = buildBaseTheme();

  // Implement Neutral Variant?
  const buttons = {
    buttonNeutralBackground: base.light,
    buttonNeutralText: base.dark,
    buttonNeutralBorder: darken(0.15, base.light),
  };

  // Implement Secondary / Link
  const general = {
    background: base.light,
    secondaryBackground: base.smokeLight,
    link: base.accent,
  };

  // Implement
  const inputs = {
    inputBorder: base.slateLight,
    inputBorderFocused: base.slate,
  };

  // Implement
  const lists = {
    listItemHoverBackground: base.smokeLight,
  };

  // Implement
  const modals = {
    modalBackdrop: base.charcoal,
    modalBackground: base.light,
    modalShadow: shadowSet[2],
  };

  // Implement
  const tables = {
    tableDivider: base.smokeDark,
    tableSelected: base.accent,
  };

  // Implement
  const text = {
    text: base.dark,
    textSecondary: base.slateDark,
    textTertiary: base.slate,
  };

  // Implement
  const tooltips = {
    tooltipBackground: base.dark,
    tooltipText: base.light,
  };

  return {
    isDark: false,
    ...base,
    ...buttons,
    ...general,
    ...lists,
    ...inputs,
    ...modals,
    ...tables,
    ...text,
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

  const general = {
    background: base.dark,
    secondaryBackground: base.grey,
    link: '#137FFB',
  };

  const lists = {
    listItemHoverBackground: base.lightDark,
  };

  const inputs = {
    inputBorder: base.slateDark,
    inputBorderFocused: base.slate,
  };

  const modals = {
    modalBackdrop: base.grey,
    modalBackground: '#1f2128',
    modalShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.08)',
  };

  const tables = {
    tableDivider: base.lightDark,
    tableSelected: base.accent,
  };

  const text = {
    text: base.lightDark,
    textSecondary: lighten(0.1, base.slate),
    textTertiary: base.slate,
  };

  const tooltips = {
    tooltipBackground: base.light,
    tooltipText: base.darkLight,
  };

  return {
    isDark: true,
    ...base,
    ...buttons,
    ...general,
    ...lists,
    ...inputs,
    ...modals,
    ...tables,
    ...text,
    ...tooltips,
  };
};

export const light = buildLightTheme();
export const dark = buildDarkTheme();
