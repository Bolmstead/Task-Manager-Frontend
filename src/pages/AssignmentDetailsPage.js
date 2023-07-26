import { useContext, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";
import ChatBox from "../components/ChatBox.js";

function AssignmentDetailsPage() {
  const { loggedInUser } = useContext(UserContext);
  const params = useParams();

  const [assignment, setAssignment] = useState(null);
  const [loadingTask, setLoadingTask] = useState(true);

  useEffect(() => {
    async function grabAssignmentDetails() {
      try {
        let apiResult = await TaxRiseAPI.getAssignmentDetails(params.id);

        const { task, user, status } = apiResult;
        if (loggedInUser.isClient && user.username !== loggedInUser.username) {
          return <Navigate to="/" replace={true} />;
        }
        setAssignment(apiResult);
        setLoadingTask(false);
      } catch (err) {
        setLoadingTask(false);
      }
    }
    grabAssignmentDetails();
  }, []);

  useEffect(() => {
    console.log("assignment", assignment);
  }, [assignment]);

  return (
    <div>
      {loadingTask ? (
        <Spinner></Spinner>
      ) : (
        <>
          Task Details <br />
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{assignment.task.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {assignment.task.description}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                Assigned to: {assignment.user.username}
              </Card.Subtitle>
            </Card.Body>
          </Card>{" "}
          <br />
          <ChatBox
            responses={assignment.responses}
            currentStatus={assignment.status}
            assignmentId={assignment._id}
          />
        </>
      )}{" "}
      <br />
      {/* {loggedInUser.isClient && (
        <Form>
          <h1>Respond</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Respond..."
            />
            <Button variant="primary">Send Response</Button>{" "}
          </Form.Group>
        </Form>
      )} */}
    </div>
  );
}

export default AssignmentDetailsPage;
