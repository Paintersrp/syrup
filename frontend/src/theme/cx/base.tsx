import { alignItemsMap, BaseProps, justifyContentMap } from '@/components/Elements';
import { shadows } from '@/theme/common';

export const baseCx = {
  root: ({
    w,
    minw,
    maxw,
    h,
    minh,
    maxh,
    m,
    mb,
    mt,
    mr,
    ml,
    p,
    pt,
    pb,
    pl,
    pr,
    br,
    c,
    bg,
    bs,
    fs,
    fw,
    d,
    fd,
    j,
    a,
    gap,
    z,
    o,
  }: BaseProps) => {
    const baseStyle = {
      width: w ? w : undefined,
      minWidth: minw ? minw : undefined,
      maxWidth: maxw ? maxw : undefined,
      height: h ? h : undefined,
      minHeight: minh ? minh : undefined,
      maxHeight: maxh ? maxh : undefined,
      margin: m ? `${m}px` : undefined,
      marginBottom: mb ? `${mb}px` : undefined,
      marginTop: mt ? `${mt}px` : undefined,
      marginRight: mr ? `${mr}px` : undefined,
      marginLeft: ml ? `${ml}px` : undefined,
      padding: p ? `${p}px` : undefined,
      paddingTop: pt ? `${pt}px` : undefined,
      paddingBottom: pb ? `${pb}px` : undefined,
      paddingLeft: pl ? `${pl}px` : undefined,
      paddingRight: pr ? `${pr}px` : undefined,
      borderRadius: br ? `${br}px` : undefined,
      color: c ? c : undefined,
      backgroundColor: bg ? bg : undefined,
      boxShadow: bs ? shadows[bs] : undefined,
      fontSize: fs ? fs : undefined,
      fontWeight: fw ? fw : undefined,
      display: d ? d : undefined,
      flexDirection: fd ? fd : undefined,
      justifyContent: j ? justifyContentMap[j] : undefined,
      alignItems: a ? alignItemsMap[a] : undefined,
      gap: gap ? gap : undefined,
      zIndex: z ? z : undefined,
      opacity: o ? o : undefined,
    };

    return [baseStyle];
  },
};