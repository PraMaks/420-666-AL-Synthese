import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "../../styles/Form.css";
import auth from "../../services/Auth";

const AddListingToOrder = () => {
  let user = auth.user;

  let history = useHistory();
  let state = history.location.state;
  let item = state.item;

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields(item);

  const [addToCartQty, setAddToCartQty] = useFormFields({
    qty: 0,
  });

  function onCreatePost(e) {
    e.preventDefault();

    if (addToCartQty.qty <= 0) {
      setErrorMessage("Erreur! Il doit avoir au moins 1 item");
      return;
    }

    axios
      .post(
        `http://localhost:9090/inventory/listing/add/${fields.itemId}/${addToCartQty.qty}/${user.userId}`
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/shop",
          });
        }, 3000);
        setErrorMessage("L'item est rajouté au panier. Vous allez être redirigé...");
      })
      .catch((error) => {
        setErrorMessage("Erreur! Veuillez réessayez!");
      });
  }

  return (
    <Container fluid className="cont_principal">
      <Row className="cont_central_signUp">
        <Col md="auto">
          <Container className="cont_title_form">
            <h2>Details de {item.product.productName}</h2>
            <h4>Prix par unité: {item.itemCost}$</h4>
            <h4>Il en reste {item.itemAvailability} en stock</h4>
          </Container>
          <Row>
            <Form onSubmit={(e) => onCreatePost(e)}>
              <Container className="cont_inputs">
                <Form.Group controlId="productName">
                  <Form.Label className="discret mb-0">
                    Nom du produit
                  </Form.Label>
                  <Form.Control
                    value={item.product.productName}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="productCompany">
                  <Form.Label className="discret mb-0">
                    Compagnie du produit
                  </Form.Label>
                  <Form.Control
                    value={item.product.productCompany}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="productDescription">
                  <Form.Label className="discret mb-0">
                    Description du produit
                  </Form.Label>
                  <Form.Control
                    value={item.product.productDescription}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Description du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="qty">
                  <Form.Control
                    value={addToCartQty.qty}
                    onChange={setAddToCartQty}
                    type="number"
                    placeholder="Quantité du produit à ajouter"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Container className="cont_btn">
                  <p
                    className="error_p"
                    style={{
                      color: errorMessage.startsWith("Erreur")
                        ? "red"
                        : "green",
                    }}
                  >
                    {errorMessage}
                  </p>
                  <button className="btn_submit">Ajouter au panier</button>
                </Container>
              </Container>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AddListingToOrder;
