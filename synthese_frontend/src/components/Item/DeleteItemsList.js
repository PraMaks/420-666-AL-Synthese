import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ItemTemplate from "./ItemTemplate";
import { ITEM_ALL } from "../../Utils/API";

function DeleteItemsList() {
  let history = useHistory();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(ITEM_ALL)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function showItem(item) {
    history.push({
      pathname: "/item/delete",
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

export default DeleteItemsList;
