/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { ReactNode } from 'react';
import { BaseProps, JustificationValue } from '../../../theme/base';
import { PaletteOptions } from '../../../theme/palettes';
import { Flexer } from '../../Containers';
import { Divider } from '../Divider/Divider';
import { Text } from '../Text/Text';

interface DrawerHeaderProps extends BaseProps {
  j?: JustificationValue;
  a?: JustificationValue;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  color?: PaletteOptions;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  j: justifyContent = 'center',
  a: alignItems = 'center',
  title,
  icon,
  children,
  color = 'drawerLight',
  ...rest
}) => {
  return (
    <React.Fragment>
      <Flexer j={justifyContent} a={alignItems} css={{ height: 53 }} {...rest}>
        <Flexer j="c">
          {icon && (
            <span
              css={{
                position: 'absolute',
                display: 'flex',
                left: 0,
                marginLeft: 24,
              }}
            >
              {icon && icon}
            </span>
          )}
          {title && (
            <Text w="auto" t="h3">
              {title}
            </Text>
          )}
        </Flexer>
        {children}
      </Flexer>
      <div css={{ width: '100%' }}>
        <Divider color={color} thickness={1} />
      </div>
    </React.Fragment>
  );
};
