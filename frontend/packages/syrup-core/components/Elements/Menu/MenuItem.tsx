/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC, ReactNode } from 'react';

import { Flexer } from '../../Containers';

import { css } from '@emotion/react';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { Base, BaseProps } from '../../../theme/base';

const styles = {
  root: (isActive: boolean) =>
    css({
      cursor: 'pointers',
      transition: 'background-color 0.3s ease',
      backgroundColor: isActive ? '#d7d7d7' : undefined,
      color: isActive ? '#333333' : undefined,
      '&:hover': {
        backgroundColor: '#e8e8e8',
      },
    }),
};

interface MenuItemProps extends BaseProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: string;
  isActive?: boolean;
  textAlign?: 'left' | 'right' | 'center';
  iconColor?: string;
}

export const MenuItem: FC<MenuItemProps> = ({
  children,
  onClick,
  icon,
  isActive = false,
  textAlign = 'left',
  iconColor = 'primary',
  ...rest
}) => {
  return (
    <Base d="flex" a="c" p="8px" css={styles.root(isActive)} onClick={onClick} {...rest}>
      {icon ? (
        <Flexer j="sb">
          <Text
            a={textAlign}
            fw="500"
            s="14px"
            css={{
              order: textAlign === 'right' ? 2 : 1,
            }}
          >
            {children}
          </Text>
          <Icon
            size="1rem"
            color={iconColor || 'primary'}
            icon={icon}
            style={{ order: textAlign === 'right' ? 1 : 2 }}
            mr={textAlign !== 'right' ? 0 : 12}
            ml={textAlign !== 'right' ? 12 : 0}
          />
        </Flexer>
      ) : (
        <Text a={textAlign} fw="500" s="14px">
          {children}
        </Text>
      )}
    </Base>
  );
};
