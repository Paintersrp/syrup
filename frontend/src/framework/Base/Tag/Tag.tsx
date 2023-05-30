import React, { CSSProperties, useState } from "react";
import MaterialIcon from "../Icon/MaterialIcon";
import Text from "../Text/Text";
import "./Tag.css";

interface TagProps {
  label: string;
  onDelete?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Tag: React.FC<TagProps> = ({ label, onDelete, className, style }) => {
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
  };

  return (
    <div
      className={`tag ${isHovered ? "tag-hover" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={style}
    >
      <Text t="subtitle2" s="0.85rem" className="tag-label">
        {label}
      </Text>
      {onDelete && (
        <MaterialIcon
          size="15px"
          color="#fff"
          className="tag-delete-icon"
          icon="close"
        />
      )}
    </div>
  );
};

export default Tag;
