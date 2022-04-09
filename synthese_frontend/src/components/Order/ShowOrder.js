import { useHistory } from "react-router";
import { Container, Form } from "react-bootstrap";
import CheckoutListing from "../Checkout/CheckoutListing";
import "../../styles/Form.css";

const ShowOrder = () => {
  let history = useHistory();
  let state = history.location.state;
  let order = state.order;

  let checkoutListings = order.listingList;
  let coutTotal = order.cost;

  return (
    <Container className="cont_principal">
      <Container className="cont_list_centrar">
        <h2 className="cont_title_form mb-3 mt-3">Votre Facture</h2>
        <Container className="cont_list">
          <p className="cont_title_form"></p>
          <ul>
            {checkoutListings.map((checkoutListing) => (
              <CheckoutListing
                key={checkoutListings.indexOf(checkoutListing)}
                checkoutListing={checkoutListing}
              />
            ))}
          </ul>
        </Container>
        <hr />
        <Form>
          <Container className="cont_inputs">
            <Form.Group controlId="address">
              <Form.Label className="discret mb-0">
                <h3>Adresse</h3>
              </Form.Label>
              <Form.Control
                value={order.address}
                type="text"
                placeholder="Addresse"
                className="input_form"
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label className="discret mb-0">
                <h3>Ville</h3>
              </Form.Label>
              <Form.Control
                value={order.city}
                type="text"
                placeholder="Ville"
                className="input_form"
                required
                disabled
              />
            </Form.Group>

          </Container>
        </Form>
        <h2 className="cont_title_form mb-3 mt-3">Coût total: {coutTotal} $</h2>
      </Container>
    </Container>
  );
};

export default ShowOrder;
