import React, { FC, CSSProperties } from 'react';
import IconButton from '../IconButton/IconButton';

interface ActionButtonProps {
  size?: 't' | 'tiny' | 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'large';
  fontSize?: string;
  color?: string;
  shade?: 'light' | 'dark' | 'main';
  mt?: number;
  mb?: number;
  pl?: number;
  pr?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
  iconColor?: string;
  iconHoverColor?: string;
  type?: 'menu' | 'add' | 'open' | 'close' | 'filter' | 'cancel' | 'save' | 'edit' | 'delete';
}

const ActionButton: FC<ActionButtonProps> = ({
  size = 'md',
  fontSize = '24px',
  color = 'primary',
  shade = 'main',
  mt,
  mb,
  pl,
  pr,
  onClick = () => {},
  className,
  style,
  iconStyle,
  iconColor = '#fff',
  iconHoverColor = '#fff',
  type = 'menu',
}) => {
  const getIconByType = (type: ActionButtonProps['type']): string => {
    switch (type) {
      case 'menu':
        return 'subject';
      case 'add':
        return 'add';
      case 'open':
        return 'expand_more';
      case 'close':
        return 'expand_less';
      case 'filter':
        return 'filter';
      case 'cancel':
        return 'cancel';
      case 'save':
        return 'save';
      case 'edit':
        return 'edit';
      case 'delete':
        return 'delete';
      default:
        return 'subject';
    }
  };

  const icon = getIconByType(type);

  return (
    <IconButton
      size={size}
      fontSize={fontSize}
      color={color}
      shade={shade}
      mt={mt}
      mb={mb}
      pl={pl}
      pr={pr}
      onClick={onClick}
      className={className}
      style={style}
      material={icon}
      iconStyle={iconStyle}
      iconColor={iconColor}
      iconHoverColor={iconHoverColor}
    />
  );
};

export default ActionButton;
