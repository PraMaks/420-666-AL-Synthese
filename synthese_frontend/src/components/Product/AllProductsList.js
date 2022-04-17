import { useState, useEffect } from "react";
import ProductTemplate from "./ProductTemplate";
import axios from "axios";
import { useHistory } from "react-router";
import { PRODUCT_ALL } from "../../Utils/API";

function AllProductsList() {
  let history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(PRODUCT_ALL)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function showProduct(product) {
    history.push({
      pathname: "/product/update",
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

export default AllProductsList;
