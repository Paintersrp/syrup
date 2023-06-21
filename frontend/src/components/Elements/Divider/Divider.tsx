import { CSSProperties, FC } from 'react';
import { css } from '@emotion/react';

import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { classify } from '@/theme/base/classify';

const cx = {
  root: css({
    width: '100%',
  }),
  text: (props: DividerProps) =>
    css({
      color: props.textColor ?? '#222',
      fontSize: `${props.textSize ?? 14}px`,
      margin: '0px 10px',
    }),
  divider: (props: DividerProps) => {
    const thickness = props.thickness ?? 1;
    const color = props.color ?? 'rgba(0, 0, 0, 0.1)';
    const borderTop = `${thickness}px ${props.dashed ? 'dashed' : 'solid'} ${color}`;

    const dividerStyle = {
      flexGrow: '1',
      border: 'none',
      borderTop,
    };

    return [classify(props), dividerStyle];
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
