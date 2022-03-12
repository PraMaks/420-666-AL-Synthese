import { useState, useEffect } from "react";
import ProductTemplate from "./ProductTemplate";
import axios from "axios";
import { useHistory } from "react-router";

function AllProductsList() {
  let history = useHistory();
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9090/inventory/product/getAll`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        setErrorMessage();
      });
  });

  function showProduct(product) {
    history.push({
      pathname: "/product/update",
      state: {
        product: product,
      },
    });
    console.log(product);
  }

  return (
    <ProductTemplate
      products={products}
      errorMessage={errorMessage}
      onClick={showProduct}
    />
  );
}

export default AllProductsList;
