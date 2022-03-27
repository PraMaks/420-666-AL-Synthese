import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function NavbarArrival() {
  
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
export default NavbarArrival;
