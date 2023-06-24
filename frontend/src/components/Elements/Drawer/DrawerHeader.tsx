import React, { ReactNode } from 'react';

import { Flexer } from '@/components/Containers';
import { Divider } from '@/components/Elements';
import { colors } from '@/theme/common';
import { BaseProps, JustificationValue } from '@/theme/base';

interface DrawerHeaderProps extends BaseProps {
  j?: JustificationValue;
  a?: JustificationValue;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  color?: keyof typeof colors;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  j: justifyContent = 'center',
  a: alignItems = 'center',
  title,
  icon,
  children,
  color = 'primary',
  ...rest
}) => {
  return (
    <React.Fragment>
      <Flexer j={justifyContent} a={alignItems} style={{ height: 53 }} {...rest}>
        <Flexer j="c">
          {icon && (
            <span
              style={{
                position: 'absolute',
                display: 'flex',
                left: 0,
                marginLeft: 24,
              }}
            >
              {icon && icon}
            </span>
          )}
          {title && <h3>{title}</h3>}
        </Flexer>
        {children}
      </Flexer>
      <div style={{ width: '100%' }}>
        <Divider color={colors[color].hover} thickness={1} />
      </div>
    </React.Fragment>
  );
};
