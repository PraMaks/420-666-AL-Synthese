import React, { useState } from "react";
import auth from "../services/Auth";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../App.css";

function Home() {
  let user = auth.user;

  return (
    <>
      <Container className="cont_principal">
        <Row className="cont_central mb-5">
          <Col xs={12} md={4}>
            <Row>
              

            </Row>
          </Col>
          <Col xs={12} md={8}>
            
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default Home;
