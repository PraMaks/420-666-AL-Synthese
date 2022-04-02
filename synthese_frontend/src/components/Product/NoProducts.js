import { useHistory } from "react-router";
import { Container } from "react-bootstrap";

const NoProducts = () => {
  let history = useHistory();
  return (
    <Container className="cont_principal">
      <Container className="cont_list_centrar">
        <h2 className="cont_title_form mb-3 mt-3">
          Il n'y a pas de produits pour le moment...
        </h2>
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
      </Container>
    </Container>
  );
};

export default NoProducts;
