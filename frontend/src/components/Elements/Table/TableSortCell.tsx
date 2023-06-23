import React from 'react';

import { Text } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { Base } from '@/theme/base';

interface TableSortCellProps {
  active: boolean;
  direction: 'asc' | 'desc' | string;
  onClick: () => void;
  label: string;
}

export const TableSortCell: React.FC<TableSortCellProps> = ({
  active,
  direction,
  onClick,
  label,
}) => {
  const getIconName = () => {
    if (active) {
      return direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
    }
    return 'sort';
  };

  return (
    <Base d="flex" a="c" j="c" cur="pointer" onClick={onClick}>
      <Text w="auto" fw="bold">
        {label}
      </Text>
      <Icon color="#222" size="18px" ml={4} icon={getIconName()} />
    </Base>
  );
};
