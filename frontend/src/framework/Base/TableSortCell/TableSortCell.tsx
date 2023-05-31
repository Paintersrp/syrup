import React from "react";
import "./TableSortCell.css";

import MaterialIcon from "../Icon/MaterialIcon";
import Text from "../Text/Text";

interface SortCellHeaderProps {
  active: boolean;
  direction: "asc" | "desc" | string;
  onClick: () => void;
  label: string;
}

const TableSortCell: React.FC<SortCellHeaderProps> = ({
  active,
  direction,
  onClick,
  label,
}) => {
  const getIconName = () => {
    if (active) {
      return direction === "asc" ? "arrow_upward" : "arrow_downward";
    }
    return "sort";
  };

  return (
    <div className="sort-cell-root" onClick={onClick}>
      <Text w="auto" fw="bold">
        {label}
      </Text>
      <MaterialIcon color="#222" size="18px" ml={4} icon={getIconName()} />
    </div>
  );
};

export default TableSortCell;
