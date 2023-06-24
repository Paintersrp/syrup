import React, { CSSProperties, ReactNode } from 'react';
import { css } from '@emotion/react';

import { Text } from '@/components/Elements';
import { Base, BaseProps } from '@/theme/base';
import { inject } from '@/theme/utils';

const styles = (theme: any) => ({
  option: (dense: boolean, selected: boolean, disabled: boolean) =>
    css({
      padding: dense ? 4 : 8,
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'background-color 0.3s ease',
      zIndex: 9999,
      backgroundColor: selected ? theme.light : undefined,
      opacity: disabled ? 0.5 : 1,

      '&:hover, &:focus': {
        backgroundColor: theme.light,
      },
    }),
});

export interface OptionProps extends BaseProps {
  children?: ReactNode;
  value?: string | number;
  isSelected?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  dense?: boolean;
  disabled?: boolean;
}

export const Option: React.FC<OptionProps> = ({
  children,
  value,
  isSelected,
  onClick,
  style,
  textStyle = { paddingLeft: 4 },
  dense,
  disabled = false,
  ...rest
}) => {
  const css = inject(styles);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const rootClass = css.option(dense, isSelected, disabled);

  return (
    <Base css={rootClass} onClick={handleClick} style={style} {...rest}>
      <Text style={textStyle}>{children}</Text>
    </Base>
  );
};
