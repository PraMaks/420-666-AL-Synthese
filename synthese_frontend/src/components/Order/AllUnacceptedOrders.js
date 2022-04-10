import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import OrderTemplate from "./OrderTemplate";

function AllUnacceptedOrders() {
  let history = useHistory();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/inventory/order/getAllUnaccepted`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function acceptOrder(order) {
    history.push({
      pathname: "/order/accept",
      state: {
        order: order,
      },
    });
  }

  return (
    <>
      <OrderTemplate
        orders={orders}
        onClick={acceptOrder}
      />
    </>
  );
}

export default AllUnacceptedOrders;
