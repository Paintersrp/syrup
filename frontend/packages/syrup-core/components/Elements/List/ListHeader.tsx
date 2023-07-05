/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC } from 'react';
import clsx from 'clsx';

import { Text } from '../Text/Text';
import { Base, BaseProps } from '../../../theme/base';

interface ListHeaderProps extends BaseProps {
  header?: string;
  style?: CSSProperties;
  className?: string;
  headerAlign?: 'left' | 'right' | 'center';
  u?: boolean;
}

export const ListHeader: FC<ListHeaderProps> = ({
  header,
  style,
  className,
  headerAlign = 'center',
  u: underline = false,
  ...rest
}) => {
  return (
    <Base
      d="flex"
      fd="column"
      a="c"
      m="4px 0px"
      className={clsx(className)}
      style={style}
      {...rest}
    >
      <Text t="h4" a={headerAlign} u={underline} uo={4}>
        {header}
      </Text>
    </Base>
  );
};
