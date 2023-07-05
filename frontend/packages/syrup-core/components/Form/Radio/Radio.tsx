/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC } from 'react';
import { css } from '@emotion/react';
import { ExtendedTheme } from '../../../theme/types';
import { inject } from '../../../theme/utils';
import { Text } from '../../Elements';

const styles = (theme: ExtendedTheme) => ({
  root: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    cursor: 'pointer',
  }),
  radio: css({
    opacity: 0,
    position: 'absolute',
  }),
  radioOutline: css({
    display: 'inline-block',
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: `2px solid ${theme.primary}`,
    marginRight: 8,
    position: 'relative',
  }),
  radioDot: css({
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.6)',
    width: 9,
    height: 9,
    borderRadius: '50%',
    backgroundColor: theme.primary,
    display: 'block',
  }),
});

export interface RadioProps {
  label: string;
  value: any;
  checked?: boolean;
  onChange?: (value: any) => void;
}

export const Radio: FC<RadioProps> = ({ label, value, checked, onChange }) => {
  const css = inject(styles);

  const handleRadioChange = () => {
    if (onChange) onChange(value);
  };

  return (
    <label css={css.root}>
      <input
        type="radio"
        css={css.radio}
        value={value}
        checked={checked}
        onChange={handleRadioChange}
      />
      <span css={css.radioOutline}>{checked && <span css={css.radioDot} />}</span>
      <Text w="auto" s="14px" c="#333" fw="400">
        {label}
      </Text>
    </label>
  );
};
