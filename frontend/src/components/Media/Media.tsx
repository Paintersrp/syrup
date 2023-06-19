import React from 'react';
import './css/Media.css';

import { Base, BaseProps } from '@/theme/base';
import { shadows } from '@/theme/common';

interface MediaProps extends BaseProps {
  src: string;
  altText: string;
  caption?: string;
  className?: string;
  mediaClass?: string;
  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  manualSize?: boolean;
  boxShadow?: number;
}

const Media: React.FC<MediaProps> = ({
  src,
  altText,
  caption,
  className,
  mediaClass,
  style,
  imageStyle,
  boxShadow = 0,
}) => {
  return (
    <Base className={`media ${className}`} style={style}>
      <img
        className={`media-image  ${mediaClass}`}
        src={src}
        alt={altText}
        style={{ ...imageStyle, boxShadow: shadows[boxShadow] }}
      />
      {caption && <div className="media-caption">{caption}</div>}
    </Base>
  );
};

export default Media;
