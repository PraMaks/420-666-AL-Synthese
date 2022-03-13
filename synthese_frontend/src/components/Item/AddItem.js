import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import auth from "../../services/Auth";
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

    axios
      .post(
        "http://localhost:9090/inventory/item/add/" +
          product.productId +
          "/" +
          fields.itemAvailability +
          "/" +
          fields.itemCost
      )
      .then((response) => {
        auth.login(() => {
          console.log(response.data);
          history.push({
            pathname: "/item/selectProduct",
          });
        }, response.data);
      })
      .catch((error) => {
        setErrorMessage();
      });
  }

  return (
    <Container fluid className="cont_principal">
      <Row className="cont_central_signUp">
        <Col md="auto">
          <Container className="cont_title_form">
            <h2>Ajout du nouveau produit</h2>
          </Container>
          <Row>
            <Form onSubmit={(e) => onCreatePost(e)}>
              <Container className="cont_inputs">
                <Form.Group controlId="productId">
                  <Form.Label className="discret mb-0">
                    ID du produit
                  </Form.Label>
                  <Form.Control
                    value={product.productId}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>
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
                  <Form.Control
                    value={fields.itemAvailability}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Description du produit"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="itemCost">
                  <Form.Control
                    value={fields.itemCost}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Compagnie du produit"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Container className="cont_btn">
                  <p>{errorMessage}</p>
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
