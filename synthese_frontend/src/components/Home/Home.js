import React from "react";
import auth from "../../services/Auth";
import { Container, Row, Col, Card } from "react-bootstrap";
import pfp from "./../../assets/img/pfp.png";
import "../../App.css";
import UserInfo from "./UserInfo";

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
                <UserInfo user={user}/>
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
