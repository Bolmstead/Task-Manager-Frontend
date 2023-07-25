import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";
import TaskCard from "../components/TaskCard.js";

function TasksPage() {
  const { loggedInUser } = useContext(UserContext);
  const [taskComponents, setTaskComponents] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    try {
      async function grabAllTasks() {
        let apiResult = await TaxRiseAPI.getAllTasks();
        console.log(
          "🚀 ~ file: TasksPage.js:16 ~ grabAllTasks ~ apiResult:",
          apiResult
        );
        let tempTaskComponents = [];
        if (apiResult.length > 0) {
          apiResult.map((task) => {
            const { title, description, assignedClients } = task;
            console.log(
              "🚀 ~ file: TasksPage.js:25 ~ apiResult.map ~ title, description:",
              title,
              description
            );
            tempTaskComponents.push(
              <TaskCard
                title={title}
                description={description}
                assignedClients={assignedClients}
              />
            );
          });
        }
        setTaskComponents(tempTaskComponents);
        setLoadingTasks(false);
      }
      grabAllTasks();
    } catch (err) {
      console.log("🚀 ~ file: TasksPage.js:45 ~ useEffect ~ err:", err);
    }
  }, []);

  return (
    <div>
      Made it to Tasks Page! <br />
      {!loggedInUser.isClient && (
        <Link to="/create-task">
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

export default TasksPage;
