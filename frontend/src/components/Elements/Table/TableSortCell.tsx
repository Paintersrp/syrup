import React from 'react';
import './TableSortCell.css';

import { Icon } from '../../Media';
import Text from '../Text/Text';

interface TableSortCellProps {
  active: boolean;
  direction: 'asc' | 'desc' | string;
  onClick: () => void;
  label: string;
}

const TableSortCell: React.FC<TableSortCellProps> = ({ active, direction, onClick, label }) => {
  const getIconName = () => {
    if (active) {
      return direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
    }
    return 'sort';
  };

  return (
    <div className="sort-cell-root" onClick={onClick}>
      <Text w="auto" fw="bold">
        {label}
      </Text>
      <Icon color="#222" size="18px" ml={4} icon={getIconName()} />
    </div>
  );
};

export default TableSortCell;
