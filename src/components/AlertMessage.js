import Alert from "react-bootstrap/Alert";

// Alert types:
// "primary","secondary","success","danger",
// "warning","info","light","dark"

function AlertMessage(props) {
  const { alertType, message } = props;
  return (
    <Alert key={alertType} variant={alertType}>
      {message}
    </Alert>
  );
}

export default AlertMessage;
