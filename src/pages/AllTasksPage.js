import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link, Navigate } from "react-router-dom";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";
import TaskCard from "../components/TaskCard.js";

function AllTasksPage() {
  const { loggedInUser } = useContext(UserContext);
  const [assignmentComponents, setAssignmentComponents] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    async function grabAllTasks() {
      try {
        let apiResult = await TaxRiseAPI.getAllAssignments();
        console.log(
          "🚀 ~ file: AllTasksPage.js:16 ~ grabAllTasks ~ apiResult:",
          apiResult
        );
        let tempAssignmentComponents = [];
        if (apiResult.length > 0) {
          apiResult.map((assignment) => {
            const { task, _id, status, user } = assignment;
            const { username } = user;
            const { title, description } = task;

            console.log(
              "🚀 ~ file: AllTasksPage.js:25 ~ apiResult.map ~ title, description:",
              title,
              description,
              task
            );
            tempAssignmentComponents.push(
              <Link
                style={{ textDecoration: "none" }}
                to={`/assignment/${_id}`}
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
        console.log("🚀 ~ file: AllTasksPage.js:45 ~ useEffect ~ err:", err);
        setLoadingTasks(false);
      }
    }
    grabAllTasks();
  }, []);

  if (loggedInUser.isClient) {
    return <Navigate to="/my-tasks" replace={true} />;
  }

  return (
    <div>
      All Tasks <br />
      {!loggedInUser.isClient && (
        <Link style={{ textDecoration: "none" }} to="/create-task">
          <Button>Create Task</Button>
        </Link>
      )}
      <br />
      {loadingTasks ? (
        <Spinner></Spinner>
      ) : assignmentComponents.length > 0 ? (
        assignmentComponents
      ) : (
        "No tasks created yet"
      )}
    </div>
  );
}

export default AllTasksPage;
