import { alignItemsMap, BaseProps, justifyContentMap } from '@/components/Elements';
import { shadowMap } from '@/utils';

export const baseCx = {
  root: (props: BaseProps) => {
    const width = props.w ? props.w : undefined;
    const minWidth = props.minw ? props.minw : undefined;
    const maxWidth = props.maxw ? props.maxw : undefined;
    const height = props.h ? props.h : undefined;
    const minHeight = props.minh ? props.minh : undefined;
    const maxHeight = props.maxh ? props.maxh : undefined;
    const margin = props.m ? `${props.m}px` : undefined;
    const marginBottom = props.mb ? `${props.mb}px` : undefined;
    const marginTop = props.mt ? `${props.mt}px` : undefined;
    const marginRight = props.mr ? `${props.mr}px` : undefined;
    const marginLeft = props.ml ? `${props.ml}px` : undefined;
    const padding = props.p ? `${props.p}px` : undefined;
    const paddingTop = props.pt ? `${props.pt}px` : undefined;
    const paddingBottom = props.pb ? `${props.pb}px` : undefined;
    const paddingLeft = props.pl ? `${props.pl}px` : undefined;
    const paddingRight = props.pr ? `${props.pr}px` : undefined;
    const borderRadius = props.br ? `${props.br}px` : undefined;
    const color = props.c ? props.c : undefined;
    const backgroundColor = props.bg ? props.bg : undefined;
    const boxShadow = props.bs ? shadowMap[props.bs] : undefined;
    const fontSize = props.fs ? props.fs : undefined;
    const fontWeight = props.fw ? props.fw : undefined;
    const display = props.d ? props.d : undefined;
    const flexDirection = props.fd ? props.fd : undefined;
    const justifyContent = props.j ? justifyContentMap[props.j] : undefined;
    const alignItems = props.a ? alignItemsMap[props.a] : undefined;
    const gap = props.gap ? props.gap : undefined;
    const zIndex = props.z ? props.z : undefined;
    const opacity = props.o ? props.o : undefined;

    const baseStyle = {
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      margin,
      marginBottom,
      marginTop,
      marginRight,
      marginLeft,
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      borderRadius,
      color,
      backgroundColor,
      boxShadow,
      fontSize,
      fontWeight,
      display,
      flexDirection,
      justifyContent,
      alignItems,
      gap,
      zIndex,
      opacity,
    };

    return [baseStyle];
  },
};
