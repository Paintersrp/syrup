/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useState } from 'react';
import { css } from '@emotion/react';
import { GenericMapping } from '../../../types';
import { ExtendedTheme } from '../../../theme/types';
import { Base, BaseProps } from '../../../theme/base';
import { inject } from '../../../theme/utils';
import { HelpText } from '../../Elements';

const sizeMapping: GenericMapping = {
  small: {
    font: 12,
    slider: 16,
    switch: { width: 40, height: 20 },
  },
  medium: {
    font: 14,
    slider: 21,
    switch: { width: 50, height: 25 },
  },
  large: {
    font: 16,
    slider: 26,
    switch: { width: 60, height: 30 },
  },
};

const styles = (theme: ExtendedTheme) => ({
  root: (size: string) =>
    css({
      display: 'flex',
      alignItems: 'center',
      fontSize: sizeMapping[size].font,
    }),
  switch: (size: string, on: boolean) =>
    css({
      position: 'relative',
      display: 'inline-block',
      borderRadius: 17,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      backgroundColor: on ? theme.success : '#ccc',
      width: sizeMapping[size].switch.width,
      height: sizeMapping[size].switch.height,
    }),
  slider: (size: string, on: boolean) =>
    css({
      position: 'absolute',
      top: 2,
      left: 2,
      borderRadius: '50%',
      backgroundColor: theme.light,
      transition: 'transform 0.3s ease',
      boxShadow: theme.shadows[1],
      width: sizeMapping[size].slider,
      height: sizeMapping[size].slider,
      transform: on ? `translateX(${sizeMapping[size].switch.height}px)` : 'translateX(0px)',
    }),
});

interface SwitchProps extends BaseProps {
  name: string;
  label?: string;
  value: boolean;
  onChange: any;
  size?: 'small' | 'medium' | 'large';
}

export const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  value,
  onChange,
  size = 'small',
  ...rest
}) => {
  const css = inject(styles);
  const [isChecked, setIsChecked] = useState(value);

  const handleToggle = (e: any) => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange({
      target: {
        name,
        checked: newValue,
      },
    });
  };

  return (
    <Base css={css.root(size)} {...rest}>
      {label && (
        <HelpText w="auto" mt={0} mb={0}>
          {label}
        </HelpText>
      )}
      <div css={css.switch(size, isChecked)} onClick={handleToggle}>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={handleToggle}
          css={{ display: 'none' }}
        />
        <span css={css.slider(size, isChecked)} />
      </div>
    </Base>
  );
};
