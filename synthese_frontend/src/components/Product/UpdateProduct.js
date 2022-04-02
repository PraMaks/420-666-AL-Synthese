import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "../../styles/Form.css";

const UpdateProduct = () => {
  let history = useHistory();
  let state = history.location.state;
  let product = state.product;

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields(product);

  function onCreatePost(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:9090/inventory/product/add`, fields)
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/product/showAll",
          });
        }, 3000);
        setErrorMessage(
          "Le produit est mis à jour. Vous allez être redirigé..."
        );
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
            <h2>Mise à jour du produit</h2>
          </Container>
          <Row>
            <Form onSubmit={(e) => onCreatePost(e)}>
              <Container className="cont_inputs">
                <Form.Group controlId="productName">
                  <Form.Label className="discret mb-0 underlined_label">
                    Nom du produit
                  </Form.Label>
                  <Form.Control
                    value={fields.productName}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom du produit"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Label className="discret mb-0 underlined_label">
                    Description du produit
                  </Form.Label>
                  <Form.Control
                    value={fields.productDescription}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Description du produit"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="productCompany">
                  <Form.Label className="discret mb-0 underlined_label">
                    Compagnie du produit
                  </Form.Label>
                  <Form.Control
                    value={fields.productCompany}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Compagnie du produit"
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
                  <button className="btn_submit">Mettre à jour</button>
                </Container>
              </Container>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProduct;
