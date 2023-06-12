import React from 'react';

import { Flexer } from '../../../Containers';
import { palettes } from '../../../../utils';
import Divider from '../../Divider/Divider';
import { BaseProps } from '../../Base/Base';
import Text from '../../Text/Text';

interface DrawerFooterProps extends BaseProps {
  title?: string;
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({ title, ...rest }) => {
  return (
    <Flexer fd="column" mb={12} {...rest}>
      <div style={{ width: '100%' }}>
        <Divider mb={2} color={palettes.primary.hover} />
      </div>
      <Text t="subtitle1" a="center">
        © 2023 {title}
        <br />
        All rights reserved.
      </Text>
    </Flexer>
  );
};

export default DrawerFooter;
