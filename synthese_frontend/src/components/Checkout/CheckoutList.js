import { useState, useEffect } from "react";
import axios from "axios";
import auth from "../../services/Auth";
import { useHistory } from "react-router";
import { Container } from "react-bootstrap";
import CheckoutListing from "./CheckoutListing";

function CheckoutList() {
  let history = useHistory();
  let coutTotal = 0;
  const [checkoutListings, setCheckoutListings] = useState([]);

  useEffect(() => {
    let user = auth.user;

    axios
      .get(`http://localhost:9090/inventory/listing/getList/${user.userId}`)
      .then((response) => {
        setCheckoutListings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  for (const checkoutListing of checkoutListings) {
    coutTotal += checkoutListing.listingPrice;
  }

  return (
    <>
      <Container className="cont_principal">
        <Container className="cont_list_centrar">
          <h2 className="cont_title_form mb-3 mt-3">Votre Facture</h2>
          <Container className="cont_list">
            <p className="cont_title_form"></p>
            <ul>
              {checkoutListings.map((checkoutListing) => (
                <CheckoutListing
                  key={checkoutListings.indexOf(checkoutListing)}
                  checkoutListing={checkoutListing}
                />
              ))}
            </ul>
          </Container>
          <h2 className="cont_title_form mb-3 mt-3">
            Cout total: {coutTotal} $
          </h2>
        </Container>
      </Container>
    </>
  );
}

export default CheckoutList;
