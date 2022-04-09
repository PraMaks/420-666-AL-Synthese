import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import auth from "../../services/Auth";
import OrderTemplate from "./OrderTemplate";

function AllOrdersList() {
  let history = useHistory();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let user = auth.user;

    axios
      .get(`http://localhost:9090/inventory/order/getList/${user.userId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function showOrder(order) {
    history.push({
      pathname: "/order/view",
      state: {
        order: order,
      },
    });
  }

  return (
    <>
      <OrderTemplate
        orders={orders}
        onClick={showOrder}
      />
    </>
  );
}

export default AllOrdersList;
