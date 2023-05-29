import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AppNavbar.css";

import { ActionButton, MaterialIcon, Navbar, Text } from "../../../Base";
import { Flexer } from "../../../Containers";

import LogoutUser from "../../../../utils/helpers/LogoutUser";
import { LinkType } from "../../../../config/links";

interface AppNavbarProps {
  menuButton?: boolean;
  drawerSize?: number;
  menuOnClick?: () => void;
  menuOpen?: boolean;
  links: LinkType[];
  children?: ReactNode;
}

const AppNavbar: FC<AppNavbarProps> = ({
  menuButton = true,
  drawerSize = 240,
  menuOnClick = () => {},
  menuOpen = false,
  links,
  children,
}) => {
  const auth: any = useSelector<any>((state) => state.auth);

  return (
    <Navbar>
      {menuButton && (
        <ActionButton
          size="lg"
          onClick={menuOnClick}
          style={{
            position: "absolute",
            marginLeft: !menuOpen ? 12 : 12 + drawerSize,
          }}
          className="menu-button"
          type="menu"
        />
      )}
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
                <Text t="h4">{item.text}</Text>
              </Link>
            );
          })}
        </Flexer>

        {!auth.is_authenticated ? (
          <Flexer j="fe" className="link-container" style={{ marginRight: 24 }}>
            <Link key="login" to="/login">
              <Text t="h4">Login</Text>
            </Link>
            <Link key="register" to="/register">
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
      {children}
    </Navbar>
  );
};

export default AppNavbar;
