import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
          "🚀 ~ file: MyTasksPage.js:17 ~ createTaskComponents ~ assignments:",
          assignments
        );

        if (assignments.length < 1) {
          return <h1>No Tasks assigned yet</h1>;
        }

        const tempTaskComponents = [];

        for (let assignment of assignments) {
          const { title, description } = assignment.task;
          tempTaskComponents.push(
            <Link
              style={{ textDecoration: "none" }}
              to={`/assignment/${assignment._id}`}
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
    <div>
      Made it to Tasks Page! <br />
      {!loggedInUser.isClient && (
        <Link style={{ textDecoration: "none" }} to="/create-task">
          <Button>Create Task</Button>
        </Link>
      )}
      <br />
      {loadingTasks ? (
        <Spinner></Spinner>
      ) : taskComponents.length > 0 ? (
        taskComponents
      ) : (
        "No tasks created yet"
      )}
    </div>
  );
}

export default MyTasksPage;
