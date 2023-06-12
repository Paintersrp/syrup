import React, { FC } from 'react';
import './List.css';

import Base, { BaseProps } from '../Base/Base';
import Text from '../Text/Text';

interface ListHeaderProps extends BaseProps {
  header?: string;
  style?: React.CSSProperties;
  className?: string;
  headerAlign?: 'left' | 'right' | 'center';
  u?: boolean;
}

const ListHeader: FC<ListHeaderProps> = ({
  header,
  style,
  className,
  headerAlign = 'center',
  u: underline = false,
  ...rest
}) => {
  return (
    <Base className={`list-header ${className}`} style={style} {...rest}>
      <Text t="h4" a={headerAlign} u={underline}>
        {header}
      </Text>
    </Base>
  );
};

export default ListHeader;
