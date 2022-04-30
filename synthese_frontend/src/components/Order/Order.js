import { Row, Col } from "react-bootstrap";

const Order = ({ order, onClick }) => {

  return (
    <Row className="list_node_item" onClick={() => onClick(order)}>
      <Col xs={9} className="list_node_text_item">
        <div>
          <li>
            {" "}
            {order.listingList.length} listing(s) - {order.cost} $, {order.address}, {order.city} {" "}
          </li>
        </div>
      </Col>
    </Row>
  );
};

export default Order;