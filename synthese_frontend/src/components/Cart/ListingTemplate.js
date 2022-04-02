import React from "react";
import "../../styles/List.css";
import { Container } from "react-bootstrap";
import Listing from "./Listing";
import NoListings from "./NoListings";

function ListingTemplate({ listings, onClick }) {
  if (listings.length >= 1) {
    return (
      <Container className="cont_principal">
        <Container className="cont_list_centrar">
          <h2 className="cont_title_form mb-3 mt-3">
            Liste de tous les items dans le panier
          </h2>
          <Container className="cont_list">
            <p className="cont_title_form"></p>
            <ul>
              {listings.map((listing) => (
                <Listing
                  key={listings.indexOf(listing)}
                  listing={listing}
                  onClick={onClick}
                />
              ))}
            </ul>
          </Container>
        </Container>
      </Container>
    );
  } else {
    return <NoListings />;
  }
}

export default ListingTemplate;
