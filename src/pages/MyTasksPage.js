import { useContext, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext.js";
import TaskCard from "../components/TaskCard.js";

function MyTasksPage() {
  const { loggedInUser } = useContext(UserContext);
  console.log(
    "🚀 ~ file: MyTasksPage.js:10 ~ MyTasksPage ~ loggedInUser:",
    loggedInUser
  );
  const [taskComponents, setTaskComponents] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    try {
      async function createTaskComponents() {
        const { assignments } = loggedInUser;
        console.log(
          "🚀 ~ file: MyTasksPage.js:21 ~ createTaskComponents ~ assignments:",
          assignments
        );

        if (assignments.length < 1) {
          console.log("assignments are less than 1");
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
              <TaskCard title={title} description={description} />{" "}
            </Link>
          );
        }
        setTaskComponents(tempTaskComponents);

        // console.log(
        //   "🚀 ~ file: MyTasksPage.js:25 ~ apiResult.map ~ title, description:",
        //   title,
        //   description
        // );
        // tempTaskComponents.push(
        //   <Link to={`/task/${_id}`}>
        //     <TaskCard title={title} description={description} />
        //   </Link>
        // );

        setLoadingTasks(false);
      }
      createTaskComponents();
    } catch (err) {
      console.log("🚀 ~ file: MyTasksPage.js:45 ~ useEffect ~ err:", err);
    }
  }, []);

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
