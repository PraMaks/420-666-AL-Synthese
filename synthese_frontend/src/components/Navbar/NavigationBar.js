import { React, useState } from "react";
import auth from "../../services/Auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../../styles/Navbar.css";

function NavigationBar() {
  let history = useHistory();

  const [userStatus, setUserStatus] = useState({
    isLoggedIn: auth.authenticated,
  });

  function checkIfLogin() {
    return (
      <>
        <Nav.Link as={Link} to="/signUp">
          <li className="nav-links-header">Inscriptions</li>
        </Nav.Link>

        <Nav.Link as={Link} to="/">
          <li className="nav-links-header">Connexion</li>
        </Nav.Link>
      </>
    );
  }
  return (
    <Navbar
      id="main-navbar"
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
    >
      <Navbar.Brand className="title-navbar"> Colossus. Inc</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr">{checkIfLogin()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
