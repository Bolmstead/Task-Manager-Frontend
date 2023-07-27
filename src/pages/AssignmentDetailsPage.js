import { useContext, useEffect, useState } from "react";
import { Container, Spinner, Stack } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";
import ChatBox from "../components/ChatBox.js";
import TaskCard from "../components/TaskCard.js";




function AssignmentDetailsPage() {
  const { loggedInUser } = useContext(UserContext);
  const params = useParams();

  const [assignment, setAssignment] = useState(null);
  const [loadingTask, setLoadingTask] = useState(true);
  const [triggerAssignmentUpdate, setTriggerAssignmentUpdate] = useState(true);

  useEffect(() => {
    async function grabAssignmentDetails() {
      try {
        const apiResult = await TaxRiseAPI.getAssignmentDetails(params.id);

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
  }, [triggerAssignmentUpdate]);


  function updateAssignment() {
    setTriggerAssignmentUpdate(!triggerAssignmentUpdate);
  }

  return (
    <Container>
      {loadingTask ? (
        <Spinner></Spinner>
      ) : (
        <Stack gap={3} className="col-md-5 mx-auto">
          <div className="tasks-page-title">
            <h1>Task Details</h1>
          </div>{" "}
          <TaskCard
            className="detailed-task-card"
            title={assignment.task.title}
            description={assignment.task.description}
            clientUsername={assignment.user.username}
            status={assignment.status}
          />{" "}
          <ChatBox
            responses={assignment.responses}
            currentStatus={assignment.status}
            assignmentId={assignment._id}
            updateAssignment={updateAssignment}
          />
        </Stack>
      )}{" "}
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
    </Container>
  );
}

export default AssignmentDetailsPage;
