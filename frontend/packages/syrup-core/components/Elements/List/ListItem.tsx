/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC, MouseEvent } from 'react';

import ListItemWithIcon from './ListItemWithIcon';
import ListItemTextOnly from './ListItemTextOnly';

import clsx from 'clsx';
import { Base, BaseProps } from '../../../theme/base';

export interface ListItemDataType {
  text: string;
  to: string;
  icon?: any;
  onClick?: () => void;
}

interface ListItemProps extends BaseProps {
  text?: string;
  subtext?: string;
  icon?: string;
  button?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  style?: CSSProperties;
  css?: any;
  className?: string;
  iconColor?: string;
  textAlign?: 'left' | 'right' | 'center';
  to?: string;
  noGutters?: boolean;
}

export const ListItem: FC<ListItemProps> = ({
  text,
  subtext,
  icon,
  button = false,
  onClick = () => {},
  style,
  className,
  css,
  iconColor = 'primary',
  textAlign = 'left',
  to,
  noGutters,
  ...rest
}) => {
  return (
    <Base
      d="flex"
      a="c"
      css={css}
      className={clsx(className)}
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
