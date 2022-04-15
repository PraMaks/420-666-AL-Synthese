import { Container } from "react-bootstrap";

const NoOrdersToConfirm = () => {
  return (
    <Container className="cont_principal">
      <Container className="cont_list_centrar">
        <h2 className="cont_title_form mb-3 mt-3">
          Il n'y a pas de commandes à confirmer
        </h2>
      </Container>
    </Container>
  );
};

export default NoOrdersToConfirm;
