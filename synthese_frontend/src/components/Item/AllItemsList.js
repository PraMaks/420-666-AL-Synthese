import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ItemTemplate from "./ItemTemplate";

function AllItemsList() {
  let history = useHistory();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/inventory/item/getAll`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function showItem(item) {
    history.push({
      pathname: "/item/update",
      state: {
        item: item,
      },
    });
    console.log(item);
  }

  return (
    <ItemTemplate
      items={items}
      onClick={showItem}
    />
  );
}

export default AllItemsList;
