import React from "react";
import "../../styles/List.css";
import { Container } from "react-bootstrap";
import Item from "./Item";
import NoItems from "./NoItems";

function ItemTemplate({ items, onClick }) {
  if (items.length >= 1) {
    return (
      <Container className="cont_principal">
        <Container className="cont_list_centrar">
          <h2 className="cont_title_form mb-3 mt-3">Liste de tous les items</h2>
          <Container className="cont_list">
            <p className="cont_title_form"></p>
            <ul>
              {items.map((item) => (
                <Item key={items.indexOf(item)} item={item} onClick={onClick} />
              ))}
            </ul>
          </Container>
        </Container>
      </Container>
    );
  } else {
    return <NoItems />;
  }
}

export default ItemTemplate;
