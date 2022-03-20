import { Row, Col } from "react-bootstrap";

const Listing = ({ listing, onClick }) => {

  return (
    <Row className="list_node_internship" onClick={() => onClick(listing)}>
      <Col xs={9} className="list_node_text_internship">
        <div>
          <li>
            {" "}
            {listing.item.product.productName} - {listing.listingAmount} unit(s), {listing.listingPrice}$ {" "}
          </li>
        </div>
      </Col>
    </Row>
  );
};

export default Listing;