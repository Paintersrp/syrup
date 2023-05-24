import React from "react";
import { shadowSwitch } from "../../../utils/switches/styleSwitches";
import "./Media.css";

interface MediaProps {
  src: string;
  altText: string;
  caption?: string;
  className?: string;
  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  size?:
    | "xsmall"
    | "xs"
    | "small"
    | "sm"
    | "medium"
    | "md"
    | "large"
    | "lg"
    | "xlarge"
    | "xl";
  manualSize?: boolean;
  boxShadow?: number;
}

const Media: React.FC<MediaProps> = ({
  src,
  altText,
  caption,
  className,
  style,
  imageStyle,
  size = "medium",
  manualSize = false,
  boxShadow = 0,
}) => {
  const getSizeClass = (): string => {
    switch (size) {
      case "xsmall":
      case "xs":
        return "media-xsmall";
      case "small":
      case "sm":
        return "media-small";
      case "medium":
      case "md":
        return "media-medium";
      case "large":
      case "lg":
        return "media-large";
      case "xlarge":
      case "xl":
        return "media-xlarge";
      default:
        return "media-medium";
    }
  };

  return (
    <div
      className={`media ${!manualSize && getSizeClass()} ${className}`}
      style={style}
    >
      <div>
        <img
          className={`media-image ${!manualSize && getSizeClass()}`}
          src={src}
          alt={altText}
          style={{ ...imageStyle, boxShadow: shadowSwitch(boxShadow) }}
        />
      </div>
      {caption && <p className="media-caption">{caption}</p>}
    </div>
  );
};

export default Media;
