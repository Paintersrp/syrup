import React from "react";
import { shadowSwitch } from "../../../utils/switches/styleSwitches";
import "./Media.css";

interface MediaProps {
  src: string;
  altText: string;
  caption?: string;
  className?: string;
  mediaClass?: string;
  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  size?:
    | "card"
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
  mediaClass,
  style,
  imageStyle,
  size = "medium",
  manualSize = false,
  boxShadow = 0,
}) => {
  const getSizeClass = (): string => {
    switch (size) {
      case "card":
        return "media-card";
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
          className={`media-image ${
            !manualSize && getSizeClass()
          } ${mediaClass}`}
          src={src}
          alt={altText}
          style={{ ...imageStyle, boxShadow: shadowSwitch(boxShadow) }}
        />
      </div>
      {caption && <div className="media-caption">{caption}</div>}
    </div>
  );
};

export default Media;
