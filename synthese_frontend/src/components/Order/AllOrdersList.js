import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import auth from "../../services/Auth";
import OrderTemplate from "./OrderTemplate";
import { ORDER_GET_LIST } from "../../Utils/API";

function AllOrdersList() {
  let history = useHistory();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let user = auth.user;

    axios
      .get(ORDER_GET_LIST + `${user.userId}`)
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
