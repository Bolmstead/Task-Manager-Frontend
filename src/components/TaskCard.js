import Card from "react-bootstrap/Card";

function TaskCard({ title, description, assignedClients }) {
  console.log(
    "🚀 ~ file: TaskCard.js:4 ~ TaskCard ~ title, description, assignedClients:",
    title,
    description,
    assignedClients
  );
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Assigned to: {assignedClients}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
