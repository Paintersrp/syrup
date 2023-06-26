import { FC, Fragment } from 'react';
import { css } from '@emotion/react';

import { Tooltip } from '../Tooltip/Tooltip';
import { Text } from '../Text/Text';
import { inject } from '@/theme/utils';
import { PaletteOptions } from '@/theme/palettes';
import { GenericMapping } from '@/types';

export type AvatarSizes = 'tiny' | 'sm' | 'md' | 'lg';

const sizeMapping: GenericMapping = {
  tiny: 26,
  sm: 32,
  md: 36,
  lg: 40,
};

const styles = (theme: any) => ({
  avatar: (color: string, size: string) =>
    css({
      borderRadius: '50%',
      backgroundColor: theme[color],
      width: sizeMapping[size],
      height: sizeMapping[size],
      ...theme.flex.cc,
    }),
});

interface AvatarProps {
  text: string;
  tooltipText?: string;
  size?: AvatarSizes;
  color?: PaletteOptions;
  textColor?: PaletteOptions;
}

export const Avatar: FC<AvatarProps> = ({
  text,
  tooltipText,
  size = 'md',
  color = 'primary',
  textColor = 'light',
}) => {
  const css = inject(styles);

  return (
    <Fragment>
      {tooltipText ? (
        <Tooltip text={tooltipText}>
          <div css={css.avatar(color, size)}>
            <Text c={textColor} a="c">
              {text.charAt(0).toUpperCase()}
            </Text>
          </div>
        </Tooltip>
      ) : (
        <div css={css.avatar(color, size)}>
          <Text c={textColor} a="c">
            {text.charAt(0).toUpperCase()}
          </Text>
        </div>
      )}
    </Fragment>
  );
};
