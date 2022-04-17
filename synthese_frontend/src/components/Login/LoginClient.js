import axios from "axios";
import React from "react";
import auth from "../../services/Auth";
import { useState } from "react";
import { useFormFields } from "../../lib/hooksLib";
import { useHistory } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { LOGIN_CLIENT } from "../../Utils/API";
import { ERROR_LOGIN } from "../../Utils/ERRORS_UTILS";

const LoginClient = () => {
  let history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  });

  function onCreatePost(e) {
    e.preventDefault();

    axios
      .get(
        LOGIN_CLIENT + `${fields.username}/${fields.password}`
      )
      .then((response) => {
        auth.login(() => {
          history.push({
            pathname: `/home/${response.data.username}`,
            state: response.data,
          });
        }, response.data);
      })
      .catch((error) => {
        setErrorMessage(
          ERROR_LOGIN
        );
      });
  }

  return (
    <Form onSubmit={(e) => onCreatePost(e)}>
      <Container className="cont_inputs">
        <Form.Group controlId="username">
          <Form.Label className="discret mb-0">
            Veuillez rentrez vos identifiants Client
          </Form.Label>
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
      </Container>
      <Container className="cont_btn">
        <p>{errorMessage}</p>
        <button className="btn_submit">Connexion</button>
      </Container>
    </Form>
  );
};
export default LoginClient;
