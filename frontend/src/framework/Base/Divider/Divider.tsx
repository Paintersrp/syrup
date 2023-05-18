import React from "react";
import "./Divider.css";

interface DividerProps {
  mb?: number;
  mt?: number;
  mr?: number;
  ml?: number;
  color?: string;
  thickness?: number;
  vertical?: boolean;
  dashed?: boolean;
  text?: string;
  textColor?: string;
  textSize?: number;
  textAlign?: "left" | "center" | "right";
}

function Divider({
  mb: marginBottom,
  mt: marginTop,
  mr: marginRight,
  ml: marginLeft,
  color = "rgba(0, 0, 0, 0.1)",
  thickness = 1,
  vertical = false,
  dashed = false,
  text = "",
  textColor = "#222",
  textSize = 14,
  textAlign = "center",
}: DividerProps) {
  const dividerStyle: React.CSSProperties = {
    marginBottom: `${marginBottom}px`,
    marginTop: `${marginTop}px`,
    marginRight: `${marginRight}px`,
    marginLeft: `${marginLeft}px`,
    borderTop: `${thickness}px ${dashed ? "dashed" : "solid"} ${color}`,
    borderLeft: vertical ? "none" : undefined,
    borderRight: vertical ? "none" : undefined,
    borderBottom: vertical ? undefined : "none",
    height: vertical ? "100%" : undefined,
  };

  const textStyle: React.CSSProperties = {
    color: textColor,
    fontSize: `${textSize}px`,
    textAlign,
  };

  return (
    <div className={`divider ${vertical ? "vertical" : "horizontal"}`}>
      {!text && <hr style={dividerStyle} />}
      {text && (
        <>
          <hr style={dividerStyle} />
          <span className="divider-text" style={textStyle}>
            {text}
          </span>
          <hr style={dividerStyle} />
        </>
      )}
    </div>
  );
}

export default Divider;
