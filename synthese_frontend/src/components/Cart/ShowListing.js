import { useFormFields } from "../../lib/hooksLib";
import { useState } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "../../styles/Form.css";
import DeleteListingFromCart from "./DeleteListingFromCart";
import auth from "../../services/Auth";

const ShowListing = () => {
  let user = auth.user;
  let history = useHistory();
  let state = history.location.state;
  let listing = state.listing;

  const [errorMessage, setErrorMessage] = useState("");

  const [fields, handleFieldChange] = useFormFields(listing);

  function onCreatePost(e) {
    e.preventDefault();

    axios
      .post(
        `http://localhost:9090/inventory/listing/update/${listing.listingId}/${fields.listingAmount}/${user.userId}`
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/cart",
          });
        }, 3000);
        setErrorMessage(
          "L'item est mis à jour dans le panier. Vous allez être redirigé..."
        );
      })
      .catch((error) => {
        setErrorMessage("Erreur! Veuillez réessayez!");
      });
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
                  <Form.Label className="discret mb-0">
                    Quantité de l'item dans le panier
                  </Form.Label>
                  <Form.Control
                    value={fields.listingAmount}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder={listing.listingAmount}
                    className="input_form"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="listingPrice">
                  <Form.Label className="discret mb-0">
                    Prix de l'item (par unité) $
                  </Form.Label>
                  <Form.Control
                    value={listing.item.itemCost}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Prix du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="listingPrice">
                  <Form.Label className="discret mb-0">
                    Prix de l'item total (avant la mise à jour) $
                  </Form.Label>
                  <Form.Control
                    value={listing.listingPrice}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="Prix du produit"
                    className="input_form"
                    required
                    disabled
                  />
                </Form.Group>

                <Container className="cont_btn">
                  <p
                    className="error_p"
                    style={{
                      color: errorMessage.startsWith("Erreur")
                        ? "red"
                        : "green",
                    }}
                  >
                    {errorMessage}
                  </p>
                  <button className="btn_submit">Mettre à jour</button>
                  <DeleteListingFromCart listingId={listing.listingId} />
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
