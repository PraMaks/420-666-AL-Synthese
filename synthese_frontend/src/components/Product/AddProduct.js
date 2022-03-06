import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import auth from "../../services/Auth";
import "../../styles/Form.css";

const AddProduct = () => {
  let history = useHistory();

  let user = auth.user;

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields({
    productName: "",
    productDescription: "",
    productCompany: "",
  });

  function onCreatePost(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:9090/inventory/product/add`, fields)
      .then((response) => {
        auth.login(() => {
          console.log(response.data);
          history.push({
            pathname: `/home/${user.username}`,
            state: response.data,
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
                <Form.Group controlId="productName">
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

export default AddProduct;
