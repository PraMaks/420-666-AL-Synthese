import { useHistory } from "react-router";

const ButtonToCheckout = () => {
  let history = useHistory();

  function proceedToCheckout(e) {
    e.preventDefault();
    history.push({
        pathname: "/cart/checkout"
    });
  }

  return (
    <>
      <button className="btn_checkout" onClick={proceedToCheckout}>
        Proceder au paiement
      </button>
    </>
  );
};
export default ButtonToCheckout;
