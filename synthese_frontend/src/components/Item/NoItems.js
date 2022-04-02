import { useHistory } from "react-router";
import { Container } from "react-bootstrap";
import auth from "../../services/Auth";

const NoItems = () => {
  let history = useHistory();

  if (auth.loggedInManager()) {
    return (
      <Container className="cont_principal">
        <Container className="cont_list_centrar">
          <h2 className="cont_title_form mb-3 mt-3">
            Il n'y a pas d'items pour le moment...
          </h2>
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
        </Container>
      </Container>
    );
  } else {
    return (
      <Container className="cont_principal">
        <Container className="cont_list_centrar">
          <h2 className="cont_title_form mb-3 mt-3">
            Il n'y a pas d'items pour le moment...
          </h2>
          <h3 className="cont_title_form mb-3 mt-3">
            Veuillez consulter cette page plus tard... 
          </h3>
        </Container>
      </Container>
    );
  }
};

export default NoItems;
