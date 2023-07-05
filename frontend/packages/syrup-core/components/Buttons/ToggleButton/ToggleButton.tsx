/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC, ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import clsx from 'clsx';

const cx = {
  toggleButton: (theme: any) => ({
    background: theme.light,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: 0,
    fontWeight: 'bold',
    color: theme.primary,
    fontSize: 14,
    padding: '0.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  active: (theme: any) => ({
    backgroundColor: theme.primary,
    color: '#fff',
  }),
};

interface ToggleButtonProps {
  value: string;
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  value,
  active,
  onClick,
  children,
  className,
  style,
}) => {
  const theme = useTheme();

  return (
    <button
      className={clsx(className)}
      css={[cx.toggleButton(theme), active && cx.active(theme)]}
      onClick={onClick}
      value={value}
      style={style}
    >
      {children}
    </button>
  );
};
