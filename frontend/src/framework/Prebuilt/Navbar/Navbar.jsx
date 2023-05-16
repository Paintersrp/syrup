import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./Navbar.css";

import ActionButton from "../Buttons/ActionButton/ActionButton";
import Flexer from "../../Base/Flexer/Flexer";
import BaseNavbar from "../../Base/BaseNavbar/BaseNavbar";
import Text from "../../Base/Text/Text";
import handleLogout from "../../../lib/Auth/Logout";

const Navbar = ({ menuButton, menuOnClick, menuOpen, drawerSize, links }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <BaseNavbar>
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
          {links.map((item, index) => (
            <Link key={index} to={item.to}>
              <Text t="h4">{item.text}</Text>
            </Link>
          ))}
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
            <Link key="logout" onClick={handleLogout}>
              <Text t="h4">Logout</Text>
            </Link>
            <Link key="profile" to="/profile">
              <Text t="h4">Profile</Text>
            </Link>
          </Flexer>
        )}
      </Flexer>
    </BaseNavbar>
  );
};

Navbar.propTypes = {
  menuButton: PropTypes.bool,
  drawerSize: PropTypes.number,
  menuOnClick: PropTypes.func,
  menuOpen: PropTypes.bool,
  children: PropTypes.node,
};

Navbar.defaultProps = {
  menuButton: true,
  drawerSize: 240,
  menuOnClick: () => {},
  menuOpen: false,
  children: null,
};

export default Navbar;
