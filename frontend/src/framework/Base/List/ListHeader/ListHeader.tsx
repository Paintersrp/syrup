import React, { FC } from "react";
import "../List.css";

import Text from "../../Text/Text";

interface ListHeaderProps {
  header?: string;
  style?: React.CSSProperties;
  className?: string;
  headerAlign?: "left" | "right" | "center";
  u?: boolean;
}

const ListHeader: FC<ListHeaderProps> = ({
  header,
  style,
  className,
  headerAlign = "center",
  u: underline = false,
}) => {
  return (
    <div className={`list-header ${className}`} style={style}>
      <Text t="h4" a={headerAlign} u={underline}>
        {header}
      </Text>
    </div>
  );
};

export default ListHeader;
