import React, { CSSProperties, useState } from 'react';
import './Tag.css';

import Base, { BaseProps } from '../Base/Base';
import { MaterialIcon } from '../../Media';
import Text from '../Text/Text';

interface TagProps extends BaseProps {
  label: string;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Tag: React.FC<TagProps> = ({ label, onDelete, onClick, className, style, ...rest }) => {
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
      className={`tag ${isHovered ? 'tag-hover' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={style}
      {...rest}
    >
      <Text t="subtitle2" s="0.85rem" a="c" className="tag-label">
        {label}
      </Text>
      {onDelete && (
        <MaterialIcon size="15px" color="#fff" className="tag-delete-icon" icon="close" />
      )}
    </Base>
  );
};

export default Tag;
