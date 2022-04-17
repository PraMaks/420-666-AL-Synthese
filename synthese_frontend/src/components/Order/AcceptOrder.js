import { useHistory } from "react-router";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import CheckoutListing from "../Checkout/CheckoutListing";
import axios from "axios";
import "../../styles/Form.css";
import { ORDER_ACCEPT } from "../../Utils/API";
import { ERROR_CONNECT } from "../../Utils/ERRORS_UTILS";
import { ACCEPT_ORDER_ACCEPTED } from "../../Utils/ACCEPT_UTILS";

const AcceptOrder = () => {
  let history = useHistory();
  let state = history.location.state;
  let order = state.order;

  let checkoutListings = order.listingList;
  let coutTotal = order.cost;

  const [errorMessage, setErrorMessage] = useState("");

  function acceptOrder(e) {
    e.preventDefault();
    axios
      .post(
        ORDER_ACCEPT + `${order.orderId}`
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/order/showAllUnaccepted",
          });
        }, 3000);
        setErrorMessage(ACCEPT_ORDER_ACCEPTED);
      })
      .catch((error) => {
        setErrorMessage(ERROR_CONNECT);
      });
  }

  return (
    <Container className="cont_principal">
      <Container className="cont_list_centrar">
        <h2 className="cont_title_form mb-3 mt-3">La facture de la commande</h2>
        <h2 className="cont_title_form mb-3 mt-3">Coût total: {coutTotal} $</h2>
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
        <Form onSubmit={(e) => acceptOrder(e)}>
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

            <Form.Group controlId="username">
              <Form.Label className="discret mb-0">
                <h3>Nom d'utilisateur de la commande</h3>
              </Form.Label>
              <Form.Control
                value={order.client.username}
                type="text"
                placeholder="username"
                className="input_form"
                required
                disabled
              />
            </Form.Group>

            <Container className="cont_btn">
              <p
                className="error_p"
                style={{
                  color: errorMessage.startsWith("Erreur") ? "red" : "green",
                }}
              >
                {errorMessage}
              </p>
              <button className="btn_checkout">Confirmer</button>
            </Container>
          </Container>
        </Form>
      </Container>
    </Container>
  );
};

export default AcceptOrder;
