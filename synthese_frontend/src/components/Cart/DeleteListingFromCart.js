import auth from "../../services/Auth";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { LISTING_DELETE } from "../../Utils/API";
import { ERROR_CONNECT } from "../../Utils/ERRORS_UTILS";
import { ACCEPT_DELETE_ITEM_CART } from "../../Utils/ACCEPT_UTILS";

const DeleteListingFromCart = ({ listingId }) => {
  let user = auth.user;
  let history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  function deleteListing(e) {
    e.preventDefault();
    axios
      .post(
        LISTING_DELETE + `${user.userId}/${listingId}`
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/cart",
          });
        }, 3000);
        setErrorMessage(ACCEPT_DELETE_ITEM_CART);
      })
      .catch((error) => {
        setErrorMessage(ERROR_CONNECT);
      });
  }

  return (
    <>
      <button className="btn_delete" onClick={deleteListing}>
        Supprimer
      </button>
      <p
        className="error_p"
        style={{
          color: errorMessage.startsWith("Erreur") ? "red" : "green",
        }}
      >
        {errorMessage}
      </p>
    </>
  );
};
export default DeleteListingFromCart;
