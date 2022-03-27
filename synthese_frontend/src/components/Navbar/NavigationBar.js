import { React, useState } from "react";
import auth from "../../services/Auth";
import { useHistory } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavbarManager from "./NavbarManager";
import NavbarClient from "./NavbarClient";
import NavbarArrival from "./NavbarArrival";
import "../../styles/Navbar.css";
import "../../styles/Session.css";

function NavigationBar() {
  let history = useHistory();
  let user = auth.user;

  const [userStatus, setUserStatus] = useState({
    isLoggedIn: auth.authenticated,
  });

  history.listen(() => {
    setUserStatus({
      isLoggedIn: auth.authenticated,
    });
  });

  function checkIfManager() {
    if (user !== undefined) {
      return user.hasOwnProperty("managerTitle");
    }
  }

  function navbarSelect() {
    if (checkIfManager() && userStatus.isLoggedIn) return <NavbarManager />;
    else if (userStatus.isLoggedIn) return <NavbarClient />;
    else return <NavbarArrival />;
  }

  return (
    <Navbar
      id="main-navbar"
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
    >
      <Navbar.Brand className="title-navbar">Colossus Inc.</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr">{navbarSelect()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
