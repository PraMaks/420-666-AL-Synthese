import { Row, Col } from "react-bootstrap";

const Product = ({ product, onClick }) => {
  return (
    <Row className="list_node_item" onClick={() => onClick(product)}>
      <Col xs={9} className="list_node_text_item">
        <div>
          <li>
            {" "}
            {product.productName}, {product.productCompany}{" "}
          </li>
        </div>
      </Col>
    </Row>
  );
};

export default Product;
