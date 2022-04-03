import { Row, Col } from "react-bootstrap";

const CheckoutListing = ({ checkoutListing }) => {

  return (
    <Row className="list_node_internship">
      <Col xs={9} className="list_node_text_internship">
        <div>
          <li>
            {" "}
            {checkoutListing.item.product.productName} - {checkoutListing.listingAmount} unit(s), {checkoutListing.listingPrice}$ {" "}
          </li>
        </div>
      </Col>
    </Row>
  );
};

export default CheckoutListing;