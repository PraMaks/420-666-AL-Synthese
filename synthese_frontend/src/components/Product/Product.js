import { Row, Col } from "react-bootstrap";

const Product = ({ product, onClick }) => {
  return (
    <Row className="list_node_internship" onClick={() => onClick(product)}>
      <Col xs={9} className="list_node_text_internship">
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
