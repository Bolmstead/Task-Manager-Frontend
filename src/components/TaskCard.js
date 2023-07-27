import Card from "react-bootstrap/Card";

function TaskCard({ title, description, status, clientUsername }) {
  return (
    <Card className="task-card">
      <Card.Body className="task-card-body">
        <Card.Title className="task-card-title">{title}</Card.Title>
        {clientUsername && (
          <Card.Subtitle className="mb-2 text-muted">
            Assigned to: {clientUsername}
          </Card.Subtitle>
        )}
        <Card.Subtitle className="mb-2 text-muted">
          Status: {status}
        </Card.Subtitle>

        <Card.Text className="mb-2 text-muted task-card-description">
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
