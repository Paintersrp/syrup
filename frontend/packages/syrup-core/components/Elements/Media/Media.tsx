/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import { ExtendedTheme } from '../../../theme/types';
import { Base, BaseProps } from '../../../theme/base';
import { inject } from '../../../theme/utils';
import { Text } from '../Text/Text';

const styles = (theme: ExtendedTheme) => ({
  media: css({
    position: 'relative',
    maxWidth: '100%',
    paddingBottom: '56.25%',
  }),
  image: (boxShadow: number) =>
    css({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: theme.imageBorderRadius,
      boxShadow: theme.shadows[boxShadow],
    }),
  caption: css({
    marginTop: 8,
    fontSize: 14,
    color: theme.primaryLight,
    position: 'absolute',
    bottom: 0,
    left: '50%',
  }),
});

interface MediaProps extends BaseProps {
  src: string;
  altText: string;
  caption?: string;
  className?: string;
  mediaClass?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  manualSize?: boolean;
  boxShadow?: number;
}

export const Media: FC<MediaProps> = ({
  src,
  altText,
  caption,
  className,
  mediaClass,
  style,
  imageStyle,
  boxShadow = 0,
  ...rest
}) => {
  const css = inject(styles);

  return (
    <Base className={clsx(className)} css={css.media} style={style} {...rest}>
      <img
        css={[css.image(boxShadow), imageStyle]}
        className={clsx(mediaClass)}
        src={src}
        alt={altText}
      />
      {/* Add Caption Overlay */}
      {caption && <Text css={css.caption}>{caption}</Text>}
    </Base>
  );
};
