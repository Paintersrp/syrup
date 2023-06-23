import { ReactNode, CSSProperties, FC } from 'react';
import { css, useTheme } from '@emotion/react';
import clsx from 'clsx';

import { PaletteOptions } from '@/theme/palettes';

const styles = {
  navbar: (theme: any, position: CSSProperties['position'], side: any, color: string) =>
    css({
      [side]: -1,
      position: position,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 54,
      backgroundColor: theme[color],
      boxShadow: theme.shadows[1],
      zIndex: 1000,
    }),
};

interface NavbarProps {
  children: ReactNode;
  position?: 'fixed' | 'absolute';
  side?: 'top' | 'bottom';
  color?: PaletteOptions;
  className?: string;
  style?: CSSProperties;
}

export const Navbar: FC<NavbarProps> = ({
  children,
  position = 'fixed',
  side = 'top',
  color = 'primary',
  className = '',
  style,
}) => {
  const theme = useTheme();

  return (
    <nav
      style={style}
      className={clsx(className)}
      css={styles.navbar(theme, position, side, color)}
    >
      {children}
    </nav>
  );
};
