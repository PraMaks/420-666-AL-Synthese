import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "../../styles/Form.css";
import { ITEM_UPDATE } from "../../Utils/API";
import { ERROR_CONNECT, ERROR_ITEM_COST, ERROR_ITEM_QTY } from "../../Utils/ERRORS_UTILS";
import { ACCEPT_UPDATE_ITEM } from "../../Utils/ACCEPT_UTILS";

const UpdateItem = () => {
  let history = useHistory();
  let state = history.location.state;
  let item = state.item;

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields(item);

  function onCreatePost(e) {
    e.preventDefault();

    if(fields.itemAvailability <= 0){
      setErrorMessage(ERROR_ITEM_QTY);
      return;
    }
    if(fields.itemCost <= 0){
      setErrorMessage(ERROR_ITEM_COST);
      return;
    }

    axios
      .post(
        ITEM_UPDATE + `${fields.product.productId}/${fields.itemAvailability}/${fields.itemCost}`
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/item/showAll",
          });
        }, 3000);
        setErrorMessage(ACCEPT_UPDATE_ITEM);
      })
      .catch((error) => {
        setErrorMessage(ERROR_CONNECT);
      });
  }

  return (
    <Container fluid className="cont_principal">
      <Row className="cont_central_signUp">
        <Col md="auto">
          <Container className="cont_title_form">
            <h2>Mise à jour de l'item</h2>
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

                <Form.Group controlId="itemAvailability">
                  <Form.Label className="discret mb-0">
                    Quantité de l'item disponible
                  </Form.Label>
                  <Form.Control
                    value={fields.itemAvailability}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Quantité de l'item disponible"
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
                    placeholder="Prix de l'item (par unité) $"
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

export default UpdateItem;
