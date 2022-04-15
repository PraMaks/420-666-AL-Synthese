import React from "react";
import "../../styles/List.css";
import { Container } from "react-bootstrap";
import Order from "./Order";
import NoOrders from "./NoOrders";
import NoOrdersToConfirm from "./NoOrdersToConfirm";
import { useLocation } from 'react-router-dom';

function OrderTemplate({ orders, onClick }) {
  const location = useLocation()

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
    if(location.pathname === "/order/showAllUnaccepted")
      return <NoOrdersToConfirm />;
    else 
      return <NoOrders />;
  }
}

export default OrderTemplate;
