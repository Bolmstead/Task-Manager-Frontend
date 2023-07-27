import { useContext, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link, Navigate } from "react-router-dom";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";
import TaskCard from "../components/TaskCard.js";

// Only Admin can view. Displays all Assignments and the Task's details
function AllTasksPage() {
  const { loggedInUser } = useContext(UserContext);
  const [assignmentComponents, setAssignmentComponents] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    async function grabAllTasks() {
      try {
        const apiResult = await TaxRiseAPI.getAllAssignments();

        const tempAssignmentComponents = [];
        if (apiResult.length > 0) {
          apiResult.map((assignment) => {
            const { task, _id, status, user } = assignment;
            const { username } = user;
            const { title, description } = task;

            tempAssignmentComponents.push(
              <Link
                key={_id}
                to={`/assignment/${_id}`}
                className="task-card-link"
              >
                <TaskCard
                  title={title}
                  description={description}
                  status={status}
                  clientUsername={username}
                />
              </Link>
            );
          });
        }
        setAssignmentComponents(tempAssignmentComponents);
        setLoadingTasks(false);
      } catch (err) {
        setLoadingTasks(false);
      }
    }
    grabAllTasks();
  }, []);

  if (loggedInUser.isClient) {
    return <Navigate to="/my-tasks" replace={true} />;
  }

  return (
    <Container>
      <Stack gap={3} className="col-md-5 mx-auto">
        <div className="tasks-page-title">
          <h1>All Assigned Tasks</h1>
        </div>

        {loadingTasks ? (
          <div className="spinner-container">
            <Spinner></Spinner>
          </div>
        ) : assignmentComponents.length > 0 ? (
          assignmentComponents
        ) : (
          "No tasks created yet"
        )}
      </Stack>
    </Container>
  );
}

export default AllTasksPage;
