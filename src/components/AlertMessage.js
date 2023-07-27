import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import UserContext from "../UserContext.js";

// Alert types:
// "primary","secondary","success","error",
// "warning","info","light","dark"

function AlertMessage({ alert }) {
  const { setAlert } = useContext(UserContext);

  const { type, message } = alert;

  return (
    <Modal show={alert} className="alert-modal">
      <Modal.Header closeButton onHide={() => setAlert(null)}>
        {" "}
        {type === "success" ? (
          <i className="bi bi-check-circle-fill text-success px-3 alert-icon"></i>
        ) : (
          <i className="bi bi-exclamation-circle-fill text-danger px-3 alert-icon"></i>
        )}
        {message}{" "}
      </Modal.Header>
    </Modal>
  );
}

export default AlertMessage;
