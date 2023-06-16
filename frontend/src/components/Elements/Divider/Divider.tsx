import { CSSProperties, FC } from 'react';
import { css } from '@emotion/react';

import { Flexer } from '@/components/Containers';
import Text from '../Text/Text';

// cx is a definition of css classes to be injected through emotion at runtime
// emotion is a highly performance driven css in js solution
// it supports prop passing as well as JavaScript logic applied to the CSS classes
const cx = {
  root: css({
    width: '100%',
  }),
  divider: (P: DividerProps) => {
    // All this is doing is taking P (Props) and applying some default values
    // These defaults handle the default theme if no prop is passed
    // You could set these directly in dividerStyle (similar to how the class text is below)
    // Abstracting out larger sets improves the readability imo
    const thickness = P.thickness ?? 1;
    const color = P.color ?? 'rgba(0, 0, 0, 0.1)';
    const marginBottom = P.mb ? `${P.mb}px` : '';
    const marginTop = P.mt ? `${P.mt}px` : '';
    const marginRight = P.mr ? `${P.mr}px` : '';
    const marginLeft = P.ml ? `${P.ml}px` : '';
    const borderTop = `${thickness}px ${P.dashed ? 'dashed' : 'solid'} ${color}`;

    const dividerStyle = {
      flexGrow: '1',
      border: 'none',
      marginBottom,
      marginTop,
      marginRight,
      marginLeft,
      borderTop,
    };

    // An example of how a hover class can be applied dynamically within this setup.
    // In actuality, you would set up a constant of hoverClasses then pass a variant,
    // and instead of returning cx.hoverClass you would return hoverMap[hoverVariant]
    // where hoverVariant is a prop of the component. Also, you wouldn't check the dashed prop
    // That's just for applying this example
    if (P.dashed) {
      return [dividerStyle, cx.hoverClass(P)];
    } else {
      return [dividerStyle, cx.hoverClass2(P)];
    }
  },
  text: (P: DividerProps) =>
    css({
      color: P.textColor ?? '#222',
      fontSize: `${P.textSize ?? 14}px`,
      margin: '0px 10px',
    }),
  hoverClass: (P: DividerProps) =>
    // Hover class with dynamic color based on the prop
    css({
      '&:hover': {
        borderTop: `2px solid ${P.color}`,
      },
    }),
  hoverClass2: (P: DividerProps) =>
    // A variant of the hover class with a thicker divider as an example
    css({
      '&:hover': {
        borderTop: `4px solid ${P.color}`,
      },
    }),
};

const cxNoComments = {
  root: css({
    width: '100%',
  }),
  divider: (P: DividerProps) => {
    const thickness = P.thickness ?? 1;
    const color = P.color ?? 'rgba(0, 0, 0, 0.1)';
    const marginBottom = P.mb ? `${P.mb}px` : '';
    const marginTop = P.mt ? `${P.mt}px` : '';
    const marginRight = P.mr ? `${P.mr}px` : '';
    const marginLeft = P.ml ? `${P.ml}px` : '';
    const borderTop = `${thickness}px ${P.dashed ? 'dashed' : 'solid'} ${color}`;

    const dividerStyle = {
      flexGrow: '1',
      border: 'none',
      marginBottom,
      marginTop,
      marginRight,
      marginLeft,
      borderTop,
    };

    if (P.dashed) {
      return [dividerStyle, cx.hoverClass(P)];
    } else {
      return [dividerStyle, cx.hoverClass2(P)];
    }
  },
  text: (P: DividerProps) =>
    css({
      color: P.textColor ?? '#222',
      fontSize: `${P.textSize ?? 14}px`,
      margin: '0px 10px',
    }),
  hoverClass: (P: DividerProps) =>
    css({
      '&:hover': {
        borderTop: `2px solid ${P.color}`,
      },
    }),
  hoverClass2: (P: DividerProps) =>
    css({
      '&:hover': {
        borderTop: `4px solid ${P.color}`,
      },
    }),
};

interface DividerProps {
  mb?: number;
  mt?: number;
  mr?: number;
  ml?: number;
  color?: string;
  thickness?: number;
  dashed?: boolean;
  text?: string;
  textColor?: string;
  textSize?: number;
  style?: CSSProperties;
  className?: string;
}

const Divider: FC<DividerProps> = ({
  mb,
  mt,
  mr,
  ml,
  color,
  thickness,
  dashed,
  text,
  textColor,
  textSize,
  style,
  className,
}) => {
  const dividerProps = { mb, mt, mr, ml, color, thickness, dashed };
  const textProps = { textColor, textSize };

  return (
    <div css={cx.root} style={style} className={className ?? ''}>
      {!text && <hr css={cx.divider(dividerProps)} />}
      {text && (
        <Flexer a="c">
          <hr css={cx.divider(dividerProps)} />
          <Text fw="400" w="auto" css={cx.text(textProps)}>
            {text}
          </Text>
          <hr css={cx.divider(dividerProps)} />
        </Flexer>
      )}
    </div>
  );
};

export default Divider;
