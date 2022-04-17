import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import auth from "../../services/Auth";
import "../../styles/Form.css";
import { SIGN_UP } from "../../Utils/API";
import { ERROR_SIGN_UP } from "../../Utils/ERRORS_UTILS";

const SignUp = () => {
  let history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  function onCreatePost(e) {
    e.preventDefault();

    axios
      .post(SIGN_UP, fields)
      .then((response) => {
        auth.login(() => {
          history.push({
            pathname: `/home/${response.data.username}`,
            state: response.data,
          });
        }, response.data);
      })
      .catch((error) => {
        setErrorMessage(ERROR_SIGN_UP);
      });
  }

  return (
    <Container fluid className="cont_principal">
      <Row className="cont_central_signUp">
        <Col md="auto">
          <Container className="cont_title_form">
            <h2>Inscription</h2>
          </Container>
          <Row>
            <Form onSubmit={(e) => onCreatePost(e)}>
              <Container className="cont_inputs">
                <Form.Label className="discret mb-0">
                  Veuillez entrer vos identifiants Client
                </Form.Label>
                <Form.Group controlId="username">
                  <Form.Control
                    value={fields.username}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom d'utilisateur"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    value={fields.password}
                    onChange={handleFieldChange}
                    type="password"
                    placeholder="Mot de passe"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Control
                    value={fields.email}
                    onChange={handleFieldChange}
                    type="email"
                    placeholder="Courriel"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="firstName">
                  <Form.Control
                    value={fields.firstName}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Prénom"
                    className="input_form"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Control
                    value={fields.lastName}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom de famille"
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

export default SignUp;
