import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ListingTemplate from "./ListingTemplate";
import auth from "../../services/Auth";
import { CART_GET } from "../../Utils/API";

function AllListingsList() {
  let history = useHistory();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let user = auth.user;

    axios
      .get(CART_GET + `${user.userId}`)
      .then((response) => {
        setListings(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function showListing(listing) {
    history.push({
      pathname: "/cart/view",
      state: {
        listing: listing,
      },
    });
  }

  return (
    <>
      <ListingTemplate
        listings={listings}
        onClick={showListing}
      />
    </>
  );
}

export default AllListingsList;
