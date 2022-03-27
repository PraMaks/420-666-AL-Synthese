import Nav from "react-bootstrap/Nav";
import auth from "../../services/Auth";
import { useHistory } from "react-router";

function NavbarClient() {
  let history = useHistory();

  return (
    <>
      <Nav.Link>
        <li
          className="nav-links-header"
          onClick={() => {
            history.push({
              pathname: "/cart",
            });
          }}
        >
          Panier
        </li>
      </Nav.Link>

      <Nav.Link>
        <li
          className="nav-links-header"
          onClick={() => {
            history.push({
              pathname: "/shop",
            });
          }}
        >
          Magasiner
        </li>
      </Nav.Link>

      <Nav.Link>
        <li
          className="nav-links-header"
          onClick={() => {
            history.push({
              pathname: "/home",
            });
          }}
        >
          Accueil
        </li>
      </Nav.Link>

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
export default NavbarClient;
