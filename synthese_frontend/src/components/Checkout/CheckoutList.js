import { useState, useEffect } from "react";
import axios from "axios";
import auth from "../../services/Auth";
import { useHistory } from "react-router";
import { Container, Form } from "react-bootstrap";
import CheckoutListing from "./CheckoutListing";
import { useFormFields } from "../../lib/hooksLib";

function CheckoutList() {
  let history = useHistory();
  let coutTotal = 0;
  const [checkoutListings, setCheckoutListings] = useState([]);

  useEffect(() => {
    let user = auth.user;

    axios
      .get(`http://localhost:9090/inventory/listing/getList/${user.userId}`)
      .then((response) => {
        setCheckoutListings(response.data);
      })
      .catch((err) => {
        setErrorMessage("Erreur de recuperation du panier!");
      });
  }, []);

  for (const checkoutListing of checkoutListings) {
    coutTotal += checkoutListing.listingPrice;
  }

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields({
    listingList: "",
    address: "",
    city: "",
    cost: -1,
  });

  function proceedWithOrder(e) {
    e.preventDefault();
    fields.listingList = checkoutListings;
    fields.cost = coutTotal;
    
    axios
      .post(
        `http://localhost:9090/inventory/order/add/${auth.user.userId}`, fields
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/home",
          });
        }, 3000);
        setErrorMessage("Votre commande a été enregistré. Vous allez être redirigé...");
      })
      .catch((error) => {
        setErrorMessage("Erreur! Veuillez réessayez!");
      });
  }

  return (
    <>
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
          <Form onSubmit={(e) => proceedWithOrder(e)}>
            <Container className="cont_inputs">
              <Form.Group controlId="address">
                <Form.Label className="discret mb-0"><h3>Adresse</h3></Form.Label>
                <Form.Control
                  value={fields.address}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Addresse"
                  className="input_form"
                  required
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label className="discret mb-0"><h3>Ville</h3></Form.Label>
                <Form.Control
                  value={fields.city}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Ville"
                  className="input_form"
                  required
                />
              </Form.Group>

              <h3 className="discret mb-0">La commande va être livrée dans 2 semaines</h3>

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
          <h2 className="cont_title_form mb-3 mt-3">
            Coût total: {coutTotal} $
          </h2>
        </Container>
      </Container>
    </>
  );
}

export default CheckoutList;
