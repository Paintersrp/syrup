import { CSSProperties, FC } from 'react';
import { css } from '@emotion/react';

import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { classify } from '@/theme/base/classify';

const dividerCx = {
  root: css({
    width: '100%',
  }),
  text: (P: DividerProps) =>
    css({
      color: P.textColor ?? '#222',
      fontSize: `${P.textSize ?? 14}px`,
      margin: '0px 10px',
    }),
  divider: (P: DividerProps) => {
    const thickness = P.thickness ?? 1;
    const color = P.color ?? 'rgba(0, 0, 0, 0.1)';
    const borderTop = `${thickness}px ${P.dashed ? 'dashed' : 'solid'} ${color}`;

    const dividerStyle = {
      flexGrow: '1',
      border: 'none',
      borderTop,
    };

    return [classify(P), dividerStyle];
  },
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

export const Divider: FC<DividerProps> = ({
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
    <div css={dividerCx.root} style={style} className={className ?? ''}>
      {!text && <hr css={dividerCx.divider(dividerProps)} />}
      {text && (
        <Flexer a="c">
          <hr css={dividerCx.divider(dividerProps)} />
          <Text fw="400" w="auto" css={dividerCx.text(textProps)}>
            {text}
          </Text>
          <hr css={dividerCx.divider(dividerProps)} />
        </Flexer>
      )}
    </div>
  );
};
