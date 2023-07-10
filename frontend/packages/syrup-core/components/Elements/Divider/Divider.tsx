/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC } from 'react';
import { css } from '@emotion/react';
import { ExtendedTheme } from '../../../theme/types';
import { makeCss } from '../../../theme/base';
import { inject } from '../../../theme/utils';
import { Flexer } from '../../Containers';
import { Text } from '../Text/Text';

const styles = (theme: ExtendedTheme) => ({
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
    const color = props.color ? theme[props.color] : 'rgba(0, 0, 0, 0.1)';
    const borderTop = `${thickness}px ${props.dashed ? 'dashed' : 'solid'} ${color}`;

    const dividerStyle = {
      flexGrow: '1',
      border: 'none',
      borderTop,
    };

    return [makeCss(props), dividerStyle];
  },
});

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
  const css = inject(styles);
  const dividerProps = { mb, mt, mr, ml, color, thickness, dashed };
  const textProps = { textColor, textSize };

  return (
    <div css={css.root} style={style} className={className ?? ''}>
      {!text && <hr css={css.divider(dividerProps)} />}
      {text && (
        <Flexer a="c">
          <hr css={css.divider(dividerProps)} />
          <Text fw="400" w="auto" css={css.text(textProps)}>
            {text}
          </Text>
          <hr css={css.divider(dividerProps)} />
        </Flexer>
      )}
    </div>
  );
};
