import React from "react";
import "../../styles/List.css";
import { Container } from "react-bootstrap";
import Order from "./Order";
import NoOrders from "./NoOrders";

function OrderTemplate({ orders, onClick }) {
  if (orders.length >= 1) {
    return (
      <Container className="cont_principal">
        <Container className="cont_list_centrar">
          <h2 className="cont_title_form mb-3 mt-3">
            Liste de toutes les commandes
          </h2>
          <Container className="cont_list">
            <p className="cont_title_form"></p>
            <ul>
              {orders.map((order) => (
                <Order
                  key={orders.indexOf(order)}
                  order={order}
                  onClick={onClick}
                />
              ))}
            </ul>
          </Container>
        </Container>
      </Container>
    );
  } else {
    return <NoOrders />;
  }
}

export default OrderTemplate;
