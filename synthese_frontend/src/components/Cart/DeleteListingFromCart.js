import auth from "../../services/Auth";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const DeleteListingFromCart = ({ listingId }) => {
  let user = auth.user;
  let history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  function deleteListing(e) {
    e.preventDefault();
    axios
      .post(
        `http://localhost:9090/inventory/listing/delete/${user.userId}/${listingId}`
      )
      .then((response) => {
        setTimeout(() => {
          history.push({
            pathname: "/cart",
          });
        }, 3000);
        setErrorMessage("L'item est supprimé du panier. Vous allez être redirigé...");
      })
      .catch((error) => {
        setErrorMessage("Erreur! Veuillez réessayez!");
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
