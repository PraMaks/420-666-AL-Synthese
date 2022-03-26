import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "../../styles/Form.css";
import DeleteListingFromCart from "./DeleteListingFromCart";

const ShowListing = () => {
  let history = useHistory();
  let state = history.location.state;
  let listing = state.listing;

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields(listing);

  function onCreatePost(e) {
    e.preventDefault();

    /*axios
      .post("http://localhost:9090/inventory/item/update/" + fields.product.productId + "/" + fields.itemAvailability + "/" + fields.itemCost)
      .then((response) => {
        history.push({
          pathname: "/item/showAll",
        });
      })
      .catch((error) => {
        setErrorMessage();
      });*/
  }

  return (
    <Container fluid className="cont_principal">
      <Row className="cont_central_signUp">
        <Col md="auto">
          <Container className="cont_title_form">
            <h2>Infos sur l'item du panier</h2>
          </Container>
          <Row>
            <Form onSubmit={(e) => onCreatePost(e)}>
              <Container className="cont_inputs">
                <Form.Group controlId="productName">
                  <Form.Label className="discret mb-0">
                    Nom du produit
                  </Form.Label>
                  <Form.Control
                    value={listing.item.product.productName}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="productCompany">
                  <Form.Label className="discret mb-0">
                    Compagnie du produit
                  </Form.Label>
                  <Form.Control
                    value={listing.item.product.productCompany}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Nom du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="productDescription">
                  <Form.Label className="discret mb-0">
                    Description du produit
                  </Form.Label>
                  <Form.Control
                    value={listing.item.product.productDescription}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Description du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>
                
                <Form.Group controlId="listingAmount">
                  <Form.Control
                    value={listing.listingAmount}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Quantité du produit à ajouter"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="listingPrice">
                  <Form.Control
                    value={listing.listingPrice}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Quantité du produit à ajouter"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>
                
                <Container className="cont_btn">
                  <p>{errorMessage}</p>
                  <button className="btn_submit">Confirmer</button>
                  <DeleteListingFromCart listingId={listing.listingId}/>
                </Container>
              </Container>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowListing;
