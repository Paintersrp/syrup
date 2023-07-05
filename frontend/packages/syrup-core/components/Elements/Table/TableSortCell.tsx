/** @jsx jsx */
import { jsx } from '@emotion/react';

import React from 'react';
import { Base } from '../../../theme/base';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

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
