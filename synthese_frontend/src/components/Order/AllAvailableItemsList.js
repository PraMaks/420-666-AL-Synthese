import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ItemTemplate from "../Item/ItemTemplate";

function AllAvailableItemsList() {
  let history = useHistory();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/inventory/item/getAllAvailable`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function showItem(item) {
    history.push({
      pathname: "/shop/add",
      state: {
        item: item,
      },
    });
  }

  return (
    <ItemTemplate
      items={items}
      onClick={showItem}
    />
  );
}

export default AllAvailableItemsList;
