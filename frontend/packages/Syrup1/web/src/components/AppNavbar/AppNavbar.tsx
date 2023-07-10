import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';

import { SiteLinkType } from '@/providers/LayoutProvider';
import { useAuthStore } from '@/stores/auth';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils/inject';
import { Flexer, IconButton, Link, Navbar, PaletteOptions, Text, useBreakpoint } from 'sy-core';

const styles = (theme: ExtendedTheme) => ({
  button: (open: boolean, drawerSize: number) =>
    css({
      position: 'absolute',
      marginLeft: !open ? 12 : 12 + drawerSize,
      transition: 'margin-left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }),
  container: (open: boolean, drawerSize: number) =>
    css({
      marginLeft: !open ? 60 : 60 + drawerSize,
      transition: 'margin-left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      '& a': {
        color: theme.light,
        padding: 8,

        '&:hover': {
          textDecoration: 'underline',
          textUnderlineOffset: 4,
        },
      },
    }),
});

type AppNavbarProps = {
  color?: PaletteOptions;
  iconColor?: PaletteOptions;
  hideMenuButton?: boolean;
  drawerSize?: number;
  menuOnClick?: () => void;
  menuOpen?: boolean;
  links: SiteLinkType[];
  children?: ReactNode;
};

export const AppNavbar: FC<AppNavbarProps> = ({
  color = 'primary',
  iconColor = 'secondary',
  hideMenuButton = false,
  drawerSize = 240,
  menuOnClick = () => {},
  menuOpen = false,
  links,
  children,
}) => {
  const css = inject(styles);
  const { authState } = useAuthStore();
  const isSmallScreen = useBreakpoint('sm');

  return (
    <Navbar color={color} style={{ height: 40 }}>
      {!hideMenuButton && (
        <IconButton
          variant="hover"
          palette={iconColor}
          size="tiny"
          onClick={menuOnClick}
          css={css.button(menuOpen, drawerSize)}
          icon="subject"
        />
      )}
      {!isSmallScreen && (
        <Flexer j="sb">
          <Flexer css={css.container(menuOpen, drawerSize)}>
            {links.map((item, index) => {
              if (!item.navbar) {
                return null;
              }
              return (
                <Link key={index} to={item.to} style={{ display: 'flex', alignItems: 'center' }}>
                  <Text s="1.15rem">{item.key}</Text>
                </Link>
              );
            })}
          </Flexer>

          {!authState.is_authenticated ? (
            <Flexer j="fe" css={css.container(menuOpen, drawerSize)} mr={24}>
              <Link key="login" to="auth/login" style={{ display: 'flex', alignItems: 'center' }}>
                <Text s="1.15rem">Login</Text>
              </Link>
              <Link
                key="register"
                to="auth/register"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Text s="1.15rem">Register</Text>
              </Link>
            </Flexer>
          ) : (
            <Flexer j="fe" css={css.container(menuOpen, drawerSize)} mr={24}>
              <Link
                key="logout"
                to="/"
                onClick={() => console.log('Clicked')}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Text s="1.15rem">Logout</Text>
              </Link>
              {/* <Link key="profile" to="/profile">
              <Text t="h4">Profile</Text>
            </Link> */}
            </Flexer>
          )}
        </Flexer>
      )}
      {children}
    </Navbar>
  );
};
