import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import UserContext from "../UserContext.js";

// Alert types:
// "primary","secondary","success","danger",
// "warning","info","light","dark"

function AlertMessage({ alert }) {
  const { setAlert } = useContext(UserContext);

  const { alertType, message } = alert;

  return (
    <Modal show={alert}>
      <Modal.Header closeButton onHide={() => setAlert(null)}>
        {" "}
        {message}{" "}
      </Modal.Header>
    </Modal>
  );
}

export default AlertMessage;
