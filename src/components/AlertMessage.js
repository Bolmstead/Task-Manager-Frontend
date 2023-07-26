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
    <Modal show={alert} style={{ width: "100%" }}>
      <Modal.Header closeButton onHide={() => setAlert(null)}>
        {" "}
        <i
          class="bi bi-check-circle-fill text-success px-3"
          style={{ fontSize: "30px" }}
        ></i>
        {message}{" "}
      </Modal.Header>
    </Modal>
  );
}

export default AlertMessage;
