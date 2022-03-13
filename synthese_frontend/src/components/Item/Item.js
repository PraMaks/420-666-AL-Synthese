import { Row, Col } from "react-bootstrap";

const Item = ({ item, onClick }) => {

  return (
    <Row className="list_node_internship" onClick={() => onClick(item)}>
      <Col xs={9} className="list_node_text_internship">
        <div>
          <li>
            {" "}
            {item.product.productName} - {item.itemAvailability} unit(s), {item.itemCost}$ {" "}
          </li>
        </div>
      </Col>
    </Row>
  );
};

export default Item;
