import { useState, useEffect } from "react";
import ProductTemplate from "./ProductTemplate";
import axios from "axios";
import { useHistory } from "react-router";

function DeleteProductsList() {
  let history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/inventory/product/getAll`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function showProduct(product) {
    history.push({
      pathname: "/product/delete",
      state: {
        product: product,
      },
    });
  }

  return (
    <ProductTemplate
      products={products}
      onClick={showProduct}
    />
  );
}

export default DeleteProductsList;
