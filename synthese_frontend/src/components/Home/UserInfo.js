import { Card } from "react-bootstrap";

const UserInfo = ({ user }) => {

    console.log(user.managerTitle)
  return (
    <>
      <Card.Body>
        <Card.Title>
          <h4>Nom d'utilisateur: {user.username}</h4>
        </Card.Title>
        <h5>Prénom: {user.firstName}</h5>
        <h5>Nom: {user.lastName}</h5>
        <h5>Adresse courriel: {user.email}</h5>
        <h5>
          {user.managerTitle !== undefined
            ? "Connecté en tant que " + user.managerTitle
            : "Connecté en tant que Client"}
        </h5>
      </Card.Body>
    </>
  );
};
export default UserInfo;
