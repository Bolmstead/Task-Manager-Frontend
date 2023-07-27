import { useContext, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext.js";
import TaskCard from "../components/TaskCard.js";

// Only accessible by a client. Displays their assigned tasks
function MyTasksPage() {
  const { loggedInUser, setAlert } = useContext(UserContext);
  const [taskComponents, setTaskComponents] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    try {
      async function createTaskComponents() {
        const { assignments } = loggedInUser;
        if (assignments.length < 1) {
          setLoadingTasks(false);
          return setTaskComponents(<div>No Tasks assigned yet</div>);
        }
        const tempTaskComponents = [];
        for (let assignment of assignments) {
          const { title, description } = assignment.task;
          tempTaskComponents.push(
            <Link
              key={assignment._id}
              to={`/assignment/${assignment._id}`}
              className="task-card-link"
            >
              <TaskCard
                title={title}
                description={description}
                status={assignment.status}
              />{" "}
            </Link>
          );
        }
        setTaskComponents(tempTaskComponents);
        setLoadingTasks(false);
      }
      createTaskComponents();
    } catch (err) {
      setAlert({ message: "Error displaying Tasks", type: "error" });
    }
  }, []);

  if (!loggedInUser) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!loggedInUser.isClient) {
    return <Navigate to="/all-tasks" replace={true} />;
  }

  return (
    <Container>
      <Stack gap={3} className="col-md-5 mx-auto">
        <div className="tasks-page-title">
          <h1>Your Assigned Tasks</h1>
        </div>
        {loadingTasks ? (
          <div className="spinner-container">
            <Spinner></Spinner>
          </div>
        ) : taskComponents.length > 0 ? (
          taskComponents
        ) : (
          <div className="soft-gray">No Tasks assigned yet</div>
        )}
      </Stack>
    </Container>
  );
}

export default MyTasksPage;
