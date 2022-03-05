import React from "react";
import auth from "../services/Auth";
import { Container, Row, Col, Card } from "react-bootstrap";
import pfp from "./../assets/img/pfp.png";
import "../App.css";

function Home() {
  let user = auth.user;

  return (
    <>
      <Container className="cont_principal">
        <Row className="cont_central mb-5">
          <Col xs={12} md={4}>
            <Row>
              <Card bg="secondary" text="white" className="pfp_card">
                <br />
                <Card.Img variant="top" src={pfp} />
                <Card.Body>
                  <Card.Title>
                    <h4>Nom d'utilisateur: {user.username}</h4>
                  </Card.Title>
                  <h5>Prénom: {user.firstName}</h5>
                  <h5>Nom: {user.lastName}</h5>
                  <h5>Adresse courriel: {user.email}</h5>
                  <h5>{auth.loggedInManager ? 'Connecté en tant que ' + user.managerTitle : 'Connecté en tant que Client'}</h5>
                </Card.Body>
                <br />
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
