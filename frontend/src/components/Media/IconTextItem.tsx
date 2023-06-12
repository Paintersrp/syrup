import React, { CSSProperties } from 'react';

import { BaseProps, Divider, Text, TextAlign } from '../Elements';
import MaterialIcon from './MaterialIcon';
import { palettes } from '../../utils';
import { Flexer } from '../Containers';

interface IconTextItemProps extends BaseProps {
  icon?: string;
  text?: string;
  subtext?: string;
  iconColor?: string;
  subtextColor?: string;
  divider?: boolean;
  textAlign?: TextAlign;
  iconSize?: CSSProperties['fontSize'];
  onClick?: any;
}

const IconTextItem: React.FC<IconTextItemProps> = ({
  icon,
  text,
  subtext,
  iconColor,
  iconSize = '20px',
  subtextColor = palettes.text.secondary,
  divider,
  textAlign,
  onClick,
  ...rest
}) => {
  return (
    <div onClick={onClick && onClick}>
      <Flexer w="auto" {...rest} j="c" a="c">
        {icon && <MaterialIcon icon={icon} mr={6} color={iconColor} size={iconSize} />}
        <Flexer fd="column" a="c" j="c" style={{ marginRight: 30 }}>
          {text && <Text a={textAlign}>{text}</Text>}
          {subtext && (
            <Text a={textAlign} c={subtextColor}>
              {subtext}
            </Text>
          )}
        </Flexer>
      </Flexer>
      {divider && <Divider mt={6} mb={6} />}
    </div>
  );
};

export default IconTextItem;
