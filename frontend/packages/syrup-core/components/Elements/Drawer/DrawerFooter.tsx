/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React from 'react';

import { Text } from '../Text/Text';
import { Divider } from '../Divider/Divider';
import { BaseProps } from '../../../theme/base';
import { Flexer } from '../../Containers';

interface DrawerFooterProps extends BaseProps {
  title?: string;
}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ title, ...rest }) => {
  return (
    <Flexer fd="column" mb={12} {...rest}>
      <div style={{ width: '100%' }}>
        <Divider mb={2} color="drawerLight" />
      </div>
      <Text t="subtitle1" a="center">
        © 2023 {title}
        <br />
        All rights reserved.
      </Text>
    </Flexer>
  );
};
