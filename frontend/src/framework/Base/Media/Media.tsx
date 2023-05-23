import React from "react";
import "./Media.css";

interface MediaProps {
  src: string;
  altText: string;
  caption?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large" | "xlarge";
}

const Media: React.FC<MediaProps> = ({
  src,
  altText,
  caption,
  className,
  style,
  size = "medium",
}) => {
  const getSizeClass = (): string => {
    switch (size) {
      case "small":
        return "media-small";
      case "medium":
        return "media-medium";
      case "large":
        return "media-large";
      case "xlarge":
        return "media-xlarge";
      default:
        return "media-medium";
    }
  };

  return (
    <div className={`media ${getSizeClass()} ${className}`} style={style}>
      <div>
        <img className="media-image" src={src} alt={altText} />
      </div>
      {caption && <p className="media-caption">{caption}</p>}
    </div>
  );
};

export default Media;
