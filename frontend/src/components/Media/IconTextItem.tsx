import React, { CSSProperties } from 'react';

import { Flexer } from '@/components/Containers';
import { Divider, Text, TextAlign } from '../Elements';
import { BaseProps } from '@/theme/base';

import { Icon } from './Icon';
interface IconTextItemProps extends BaseProps {
  icon?: string;
  text?: string;
  subtext?: string;
  iconColor?: string;
  subtextColor?: string;
  divider?: boolean;
  textAlign?: TextAlign;
  fontSize?: CSSProperties['fontSize'];
  iconSize?: CSSProperties['fontSize'];
  onClick?: any;
}

export const IconTextItem: React.FC<IconTextItemProps> = ({
  icon,
  text,
  subtext,
  iconColor,
  iconSize = '20px',
  subtextColor = 'secondary',
  divider,
  textAlign,
  fontSize,
  onClick,
  fw,
  ...rest
}) => {
  return (
    <div onClick={onClick && onClick}>
      <Flexer w="auto" {...rest} j="c" a="c">
        {icon && <Icon icon={icon} mr={6} color={iconColor} size={iconSize} />}
        <Flexer fd="column" a="c" j="c" mr={30}>
          {text && (
            <Text a={textAlign} s={fontSize} fw={fw}>
              {text}
            </Text>
          )}
          {subtext && (
            <Text a={textAlign} c={subtextColor} s={fontSize} fw={fw}>
              {subtext}
            </Text>
          )}
        </Flexer>
      </Flexer>
      {divider && <Divider mt={6} mb={6} />}
    </div>
  );
};
