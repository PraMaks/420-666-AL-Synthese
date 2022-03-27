import Nav from "react-bootstrap/Nav";
import auth from "../../services/Auth";
import { useHistory } from "react-router";

function NavbarManager() {
  let history = useHistory();

  return (
    <>
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

      <div className="menu-item menu-navbar">
        <p className="menu-item-title py-2">Options Produit</p>
        <ul>
          <li>
            <button
              className="menu-item-button menu-item-button-selected"
              onClick={() => {
                history.push({
                  pathname: "/product/add",
                });
              }}
            >
              Ajouter un produit
            </button>
          </li>

          <li>
            <button
              className="menu-item-button menu-item-button-selected"
              onClick={() => {
                history.push({
                  pathname: "/product/showAll",
                });
              }}
            >
              Modifier un produit
            </button>
          </li>
        </ul>
      </div>

      <div className="menu-item menu-navbar">
        <p className="menu-item-title py-2">Options Item</p>
        <ul>
          <li>
            <button
              className="menu-item-button menu-item-button-selected"
              onClick={() => {
                history.push({
                  pathname: "/item/selectProduct",
                });
              }}
            >
              Ajouter un item
            </button>
          </li>

          <li>
            <button
              className="menu-item-button menu-item-button-selected"
              onClick={() => {
                history.push({
                  pathname: "/item/showAll",
                });
              }}
            >
              Modifier un item
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
}
export default NavbarManager;
