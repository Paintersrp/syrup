import { FC, Fragment } from 'react';
import { css } from '@emotion/react';

import { Tooltip } from '../Tooltip/Tooltip';
import { Text } from '../Text/Text';
import { Flexer } from '@/components/Containers';
import { PaletteOptions } from '@/theme/palettes';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';
import { GenericMapping } from '@/types';

export type AvatarSizes = 'tiny' | 'sm' | 'md' | 'lg';

const sizeMapping: GenericMapping = {
  tiny: { dim: 28, font: 14 },
  sm: { dim: 32, font: 16 },
  md: { dim: 36, font: 16 },
  lg: { dim: 40, font: 18 },
};

const styles = (theme: ExtendedTheme) => ({
  avatar: (color: string, size: string) =>
    css({
      borderRadius: '50%',
      backgroundColor: theme[color],
      width: sizeMapping[size].dim,
      height: sizeMapping[size].dim,
      ...theme.flex('c', 'c'),
    }),
});

export interface AvatarProps {
  text?: string;
  tooltipText?: string;
  label?: string;
  size?: AvatarSizes;
  color?: PaletteOptions;
  textColor?: PaletteOptions;
  labelColor?: PaletteOptions;
}

export const Avatar: FC<AvatarProps> = ({
  text,
  tooltipText,
  label,
  size = 'md',
  color = 'primary',
  textColor = 'light',
  labelColor = 'dark',
}) => {
  const css = inject(styles);
  const fontSize = sizeMapping[size].font;

  const Avatar = (
    <div css={css.avatar(color, size)}>
      <Text fw="bold" a="c" s={fontSize - 2} mt={0} mb={0} c={textColor}>
        {text?.charAt(0).toUpperCase()}
      </Text>
    </div>
  );

  const Label = (
    <Text a="c" s={fontSize} mt={4} mb={0} c={labelColor}>
      {label}
    </Text>
  );

  const FinalAvatar = tooltipText ? (
    <Tooltip text={tooltipText}>
      {Avatar}
      {label && Label}
    </Tooltip>
  ) : (
    <Fragment>
      {Avatar}
      {label && Label}
    </Fragment>
  );

  return (
    <Fragment>
      <Flexer a="c" fd="column">
        {FinalAvatar}
      </Flexer>
    </Fragment>
  );
};
