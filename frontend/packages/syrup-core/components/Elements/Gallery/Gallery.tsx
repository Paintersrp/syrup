/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useState } from 'react';
import { css } from '@emotion/react';
import { ExtendedTheme } from '../../../theme/types';
import { Base, BaseProps } from '../../../theme/base';
import { inject } from '../../../theme/utils';
import { Text } from '../Text/Text';

const styles = (theme: ExtendedTheme) => ({
  root: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: 10,
  }),
  grid: css({}),
  masonry: css({}),
  image: css({
    width: '100%',
    borderRadius: theme.imageBorderRadius,
    boxShadow: theme.imageBoxShadow,
    cursor: 'pointer',
  }),
  lightboxOverlay: css({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 11, 11, 0.95)',
    zIndex: 9999,
    cursor: 'pointer',
    ...theme.flex('c', 'c'),
  }),
  lightboxContent: css({
    position: 'relative',
  }),
  lightboxImage: css({
    display: 'block',
    borderRadius: theme.imageBorderRadius,
  }),
  lightboxCaption: css({
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
    color: theme.textHighlight,
  }),
});

interface GalleryProps extends BaseProps {
  images: { url: string; caption?: string }[];
  layout: 'grid' | 'masonry';
}

export const Gallery: React.FC<GalleryProps> = ({ images, layout }) => {
  const css = inject(styles);
  const [selected, setSelected] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelected(index);
  };

  const closeLightbox = () => {
    setSelected(null);
  };

  const getRootClass = () => {
    switch (layout) {
      case 'grid':
        return [css.root, css.grid];
      case 'masonry':
        return [css.root, css.masonry];
      default:
        return css.root;
    }
  };

  return (
    <Base css={getRootClass()}>
      {images.map((image, index) => (
        <div key={index} onClick={() => openLightbox(index)}>
          <img src={image.url} alt={`Image ${index}`} css={css.image} />
          {image.caption && <Text a="c">{image.caption}</Text>}
        </div>
      ))}
      {selected !== null && (
        <div css={css.lightboxOverlay} onClick={closeLightbox}>
          <div css={css.lightboxContent}>
            <img src={images[selected].url} alt={`Image ${selected}`} css={css.lightboxImage} />
            {images[selected].caption && (
              <Text t="h1" a="c" css={css.lightboxCaption}>
                {images[selected].caption}
              </Text>
            )}
          </div>
        </div>
      )}
    </Base>
  );
};
