import React, { FC, MouseEvent } from 'react';
import './List.css';

import ListItemWithIcon from './ListItemWithIcon';
import ListItemTextOnly from './ListItemTextOnly';
import { Base, BaseProps } from '@/theme/base';

export interface ListItemDataType {
  text: string;
  to: string;
  icon?: any;
  onClick?: () => void;
}

interface ListItemProps extends BaseProps {
  text?: string;
  subtext?: string;
  icon: string;
  button?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  iconColor?: string;
  textAlign?: 'left' | 'right' | 'center';
  to?: string;
  noGutters?: boolean;
}

const ListItem: FC<ListItemProps> = ({
  text,
  subtext,
  icon,
  button = false,
  onClick = () => {},
  style,
  className,
  iconColor = 'primary',
  textAlign = 'left',
  to,
  noGutters,
  ...rest
}) => {
  return (
    <Base
      className={`list-item ${className}`}
      onClick={onClick}
      style={{ ...style, cursor: button || to ? 'pointer' : undefined }}
      {...rest}
    >
      {icon ? (
        <ListItemWithIcon
          text={text}
          subtext={subtext}
          icon={icon}
          iconColor={iconColor}
          textAlign={textAlign}
          to={to}
          noGutters={noGutters}
        />
      ) : (
        <ListItemTextOnly
          text={text}
          subtext={subtext}
          textAlign={textAlign}
          to={to}
          noGutters={noGutters}
        />
      )}
    </Base>
  );
};

export default ListItem;
