import { useHistory } from "react-router";
import { Container } from "react-bootstrap";

const NoOrders = () => {
  let history = useHistory();
  return (
    <Container className="cont_principal">
      <Container className="cont_list_centrar">
        <h2 className="cont_title_form mb-3 mt-3">
          Vous n'avez pas fait de commandes encore
        </h2>
        <button
          className="menu-item-button menu-item-button-selected"
          onClick={() => {
            history.push({
              pathname: "/shop",
            });
          }}
        >
          Magasiner
        </button>
      </Container>
    </Container>
  );
};

export default NoOrders;
