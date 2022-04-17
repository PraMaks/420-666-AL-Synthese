import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "../../styles/Form.css";
import { PRODUCT_DELETE } from "../../Utils/API";
import { ERROR_CONNECT } from "../../Utils/ERRORS_UTILS";
import { ACCEPT_DELETE_PRODUCT } from "../../Utils/ACCEPT_UTILS";

const DeleteProduct = () => {
  let history = useHistory();
  let state = history.location.state;
  let product = state.product;

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields(product);

  function onCreatePost(e) {
    e.preventDefault();

    axios
      .post(
        PRODUCT_DELETE +`${product.productId}`
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/product/showAll",
          });
        }, 3000);
        setErrorMessage(ACCEPT_DELETE_PRODUCT);
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
            <h2>Suppression du produit</h2>
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
                    disabled
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
                    disabled
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
                    disabled
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
                  <button className="btn_submit">Supprimer</button>
                </Container>
              </Container>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteProduct;
