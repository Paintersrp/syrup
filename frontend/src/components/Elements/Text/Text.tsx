import React, { CSSProperties, ReactNode } from 'react';

export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button';

export type AlignmentValue = 'l' | 'left' | 'r' | 'right' | 'c' | 'center';
export type TextAlign = 'left' | 'right' | 'center';

export interface TextProps {
  t?: TextType;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  mr?: CSSProperties['marginRight'];
  ml?: CSSProperties['marginLeft'];
  pt?: CSSProperties['paddingTop'];
  pl?: CSSProperties['paddingLeft'];
  s?: CSSProperties['fontSize'];
  fw?: CSSProperties['fontWeight'];
  a?: AlignmentValue;
  w?: CSSProperties['width'];
  u?: boolean;
  uo?: CSSProperties['textUnderlineOffset'];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  c?: CSSProperties['color'] | string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

const alignSwitch = (value: AlignmentValue): TextAlign | undefined => {
  const alignmentMap: Record<AlignmentValue, TextAlign> = {
    l: 'left',
    left: 'left',
    r: 'right',
    right: 'right',
    c: 'center',
    center: 'center',
  };

  return alignmentMap[value] || undefined;
};

const typeSwitch = (type: TextType): keyof JSX.IntrinsicElements => {
  switch (type) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'subtitle1':
    case 'subtitle2':
    case 'body1':
    case 'body2':
    case 'button':
      return 'p';
    default:
      return 'p';
  }
};

const Text: React.FC<TextProps> = ({
  t: type = 'body1',
  mt: marginTop,
  mb: marginBottom,
  mr: marginRight,
  ml: marginLeft,
  pt: paddingTop,
  pl: paddingLeft,
  s: fontSize,
  fw: fontWeight,
  a: align = 'left',
  w: width = '100%',
  u: underline = false,
  uo: textUnderlineOffset = 4,
  children,
  className,
  style,
  c: color,
  dangerouslySetInnerHTML,
}) => {
  let Component: keyof JSX.IntrinsicElements = typeSwitch(type);

  return (
    <Component
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={`${type} ${className || ''}`}
      style={{
        marginBottom: marginBottom && marginBottom,
        marginTop: marginTop && marginTop,
        marginRight: marginRight && marginRight,
        marginLeft: marginLeft && marginLeft,
        paddingTop: paddingTop && paddingTop,
        paddingLeft: paddingLeft && paddingLeft,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: alignSwitch(align),
        width: width,
        color: color && color,
        textDecoration: underline ? 'underline' : '',
        textUnderlineOffset: textUnderlineOffset,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

export default Text;
