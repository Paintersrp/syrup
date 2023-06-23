import { FC, ReactNode } from 'react';

import './css/AppNavbar.css';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Link, Navbar, Text } from '@/components/Elements';
import { useBreakpoint } from '@/hooks';
import { LogoutUser } from '@/utils';

import { SiteLinkType } from '@/providers/LayoutProvider';
import { useAuthStore } from '@/stores/auth';

type AppNavbarProps = {
  menuButton?: boolean;
  drawerSize?: number;
  menuOnClick?: () => void;
  menuOpen?: boolean;
  links: SiteLinkType[];
  children?: ReactNode;
};

export const AppNavbar: FC<AppNavbarProps> = ({
  menuButton = true,
  drawerSize = 240,
  menuOnClick = () => {},
  menuOpen = false,
  links,
  children,
}) => {
  const { authState } = useAuthStore();
  const isSmallScreen = useBreakpoint('sm');

  return (
    <Navbar color="primary">
      {menuButton && (
        <IconButton
          variant="float"
          palette="secondary"
          size="sm"
          onClick={menuOnClick}
          css={{
            position: 'absolute',
            marginLeft: !menuOpen ? 12 : 12 + drawerSize,
            transition: 'margin-left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          icon="subject"
        />
      )}
      {!isSmallScreen && (
        <Flexer j="sb">
          <Flexer
            className="link-container"
            style={{ marginLeft: !menuOpen ? 80 : 80 + drawerSize }}
          >
            {links.map((item, index) => {
              if (!item.navbar) {
                return null;
              }
              return (
                <Link key={index} to={item.to}>
                  <Text t="h4">{item.key}</Text>
                </Link>
              );
            })}
          </Flexer>

          {!authState.is_authenticated ? (
            <Flexer j="fe" className="link-container" style={{ marginRight: 24 }}>
              <Link key="login" to="auth/login">
                <Text t="h4">Login</Text>
              </Link>
              <Link key="register" to="auth/register">
                <Text t="h4">Register</Text>
              </Link>
            </Flexer>
          ) : (
            <Flexer j="fe" className="link-container" style={{ marginRight: 24 }}>
              <Link key="logout" to="/" onClick={LogoutUser}>
                <Text t="h4">Logout</Text>
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
