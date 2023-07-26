import Card from "react-bootstrap/Card";

function TaskCard({ title, description, status, clientUsername }) {

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Status: {status}
        </Card.Subtitle>

        <Card.Text className="mb-2 text-muted">{description}</Card.Text>
        {clientUsername && (
          <Card.Text className="mb-2 text-muted">
            Assigned to: {clientUsername}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
