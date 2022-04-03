import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "../../styles/Form.css";

const AddItem = () => {
  let history = useHistory();
  let state = history.location.state;
  let product = state.product;

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields({
    itemAvailability: 0.0,
    itemCost: 0.0,
  });

  function onCreatePost(e) {
    e.preventDefault();

    if(fields.itemAvailability <= 0){
      setErrorMessage("Erreur! Il doit avoir au moins 1 item");
      return;
    }
    if(fields.itemCost <= 0){
      setErrorMessage("Erreur! L'item doit avoir une valeur supérieure à 0");
      return;
    }

    axios
      .post(
        `http://localhost:9090/inventory/item/add/${product.productId}/${fields.itemAvailability}/${fields.itemCost}`
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/item/showAll",
          });
        }, 3000);
        setErrorMessage("L'item est rajouté. Vous allez être redirigé...")
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
            <h2>Ajout du nouveau item</h2>
          </Container>
          <Row>
            <Form onSubmit={(e) => onCreatePost(e)}>
              <Container className="cont_inputs">
                <Form.Group controlId="productName">
                  <Form.Label className="discret mb-0">
                    Nom du produit
                  </Form.Label>
                  <Form.Control
                    value={product.productName}
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
                    value={product.productDescription}
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
                    value={product.productCompany}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="itemAvailability">
                  <Form.Label className="discret mb-0">
                    Quantité de l'item disponible
                  </Form.Label>
                  <Form.Control
                    value={fields.itemAvailability}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Disponibilité du produit"
                    className="input_form"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="itemCost">
                  <Form.Label className="discret mb-0">
                    Prix de l'item (par unité) $
                  </Form.Label>
                  <Form.Control
                    value={fields.itemCost}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Prix du produit"
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
                  <button className="btn_submit">Confirmer</button>
                </Container>
              </Container>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AddItem;
