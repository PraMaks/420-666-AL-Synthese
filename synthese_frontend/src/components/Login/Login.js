import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginClient from "./LoginClient";
import LoginManager from "./LoginManager";
import "../../styles/Form.css";

const Login = () => {
  const [currentLogin, setCurrentLogin] = useState("client");

  function handleClick(newChoice) {
    return function () {
      setCurrentLogin(newChoice);
    };
  }

  function chooseLogin() {
    if (currentLogin === "client") {
      return <LoginClient />;
    }
    if (currentLogin === "manager") {
      return <LoginManager />;
    }
    return <p>Not Implemented yet</p>;
  }

  return (
    <Container fluid className="cont_principal">
      <Row className="cont_central_signUp">
        <Col md="auto">
          <Container className="cont_title_form">
            <h2>Connexion</h2>
          </Container>
          <Row className="cont_buttons_sign_up">
            <Col xs={3} className="px-0">
              <button
                size="md"
                className={
                  currentLogin === "client"
                    ? "btn_link btn_link_selected"
                    : "btn_link"
                }
                onClick={handleClick("client")}
              >
                Client
              </button>
            </Col>
            <Col xs={4} className="px-0">
              <button
                size="md"
                className={
                  currentLogin === "manager"
                    ? "btn_link btn_link_selected"
                    : "btn_link"
                }
                onClick={handleClick("manager")}
              >
                Manager
              </button>
            </Col>
          </Row>
          <Row>{chooseLogin()}</Row>
        </Col>
      </Row>
    </Container>
    
  );
};
export default Login;
