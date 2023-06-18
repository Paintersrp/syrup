import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './css/AppNavbar.css';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Navbar, Text } from '@/components/Elements';
import { useBreakpoint } from '@/hooks';
import { LogoutUser } from '@/utils';

import { breakpoints, colors } from '@/theme/common';
import { SiteLinkType } from '@/providers/LayoutProvider';

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
  const auth: any = useSelector<any>((state) => state.auth);
  const isSmallScreen = useBreakpoint('sm');

  return (
    <Navbar>
      {menuButton && (
        <IconButton
          size="lg"
          onClick={menuOnClick}
          style={{
            position: 'absolute',
            marginLeft: !menuOpen ? 12 : 12 + drawerSize,
          }}
          className="menu-button"
          material="subject"
          fontSize="24px"
          iconColor={colors.secondary.main}
          iconHoverColor={colors.secondary.main}
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

          {!auth.is_authenticated ? (
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
