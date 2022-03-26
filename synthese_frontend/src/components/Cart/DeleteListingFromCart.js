import auth from "../../services/Auth";
import { useHistory } from "react-router";
import axios from "axios";

const DeleteListingFromCart = ({ listingId }) => {
  let user = auth.user;
  let history = useHistory();

  function deleteListing(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:9090/inventory/listing/delete/" +
          user.userId +
          "/" +
          listingId
      )
      .then((response) => {
        history.push({
          pathname: "/cart",
        });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <>
      <button className="btn btn-danger btn-sm" onClick={deleteListing}>
        Supprimer
      </button>
    </>
  );
};
export default DeleteListingFromCart;
