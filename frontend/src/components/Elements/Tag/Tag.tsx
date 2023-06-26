import React, { CSSProperties, useState } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { Text } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { Base, BaseProps } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';

const styles = (theme: ExtendedTheme) => ({
  tag: css({
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: 16,
    lineHeight: 1,
    transition: 'background-color 0.3s ease',
  }),
});

interface TagProps extends BaseProps {
  label: string;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const Tag: React.FC<TagProps> = ({
  label,
  onDelete,
  onClick,
  className,
  style,
  ...rest
}) => {
  const css = inject(styles);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (onDelete) {
      onDelete();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Base
      className={clsx(className)}
      css={css.tag}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={style}
      {...rest}
    >
      <Text t="subtitle2" s="0.85rem" a="c" c="inherit">
        {label}
      </Text>
      {onDelete && <Icon size="15px" color="#fff" icon="close" ml={2} />}
    </Base>
  );
};
