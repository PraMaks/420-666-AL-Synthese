import React from "react";
import "../../styles/List.css";
import { Container } from "react-bootstrap";
import Product from "./Product";

function ProductTemplate({ products, errorMessage, onClick }) {
  return (
    <Container className="cont_principal">
      <Container className="cont_list_centrar">
        <h2 className="cont_title_form mb-3 mt-3">
          Liste de tous les produits
        </h2>
        <Container className="cont_list">
          <p className="cont_title_form">{errorMessage}</p>
          <ul>
            {products.map((product) => (
              <Product
                key={products.indexOf(product)}
                product={product}
                onClick={onClick}
              />
            ))}
          </ul>
        </Container>
      </Container>
    </Container>
  );
}

export default ProductTemplate;
