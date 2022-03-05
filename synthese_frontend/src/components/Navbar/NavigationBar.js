import { React, useState } from "react";
import auth from "../../services/Auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../../styles/Navbar.css";
import "../../styles/Session.css";

function NavigationBar() {
  let history = useHistory();

  const [userStatus, setUserStatus] = useState({
    isLoggedIn: auth.authenticated,
    isLoggedInManager: auth.isLoggedInManager
  });

  history.listen(() => {
    setUserStatus({
      isLoggedIn: auth.authenticated,
    });
  });

  function checkIfLogin() {
    if (userStatus.isLoggedInManager) {
      return (
        <>
          <div className="menu-item menu-navbar">
            <ul>
              <li>
                <button
                  onClick={() => {
                    history.push({
                      pathname: "/home",
                    });
                  }}
                >
                  ACCUEIL
                </button>
              </li>
            </ul>
          </div>
          <Nav.Link>
            <li
              className="nav-links-header"
              onClick={() => {
                auth.logout(() => {
                  history.push("/");
                });
              }}
            >
              Déconnexion
            </li>
          </Nav.Link>
        </>
      );
    } else if (userStatus.isLoggedIn) {
      return (
        <>
        <Nav.Link>
            <li
              className="nav-links-header"
              onClick={() => {
                auth.logout(() => {
                  history.push("/");
                });
              }}
            >
              Déconnexion
            </li>
          </Nav.Link>
        </>
      );
    }
    else {
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
        <Nav className="mr">{checkIfLogin()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
