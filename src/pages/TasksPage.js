import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";

function TasksPage() {
  const { loggedInUser } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function grabAllTasks() {
      let apiResult = await TaxRiseAPI.getAllTasks();
      console.log(
        "🚀 ~ file: TasksPage.js:16 ~ grabAllTasks ~ apiResult:",
        apiResult
      );

      setTasks(apiResult);
    }
    grabAllTasks();
  }, []);

  useEffect(() => {
    console.log("loggedInUser", loggedInUser);
  }, [loggedInUser]);
  return (
    <div>
      Made it to Tasks Page! <div>{tasks}</div>
      <Link to="/create-task">
        <Button>Create Task</Button>
      </Link>
    </div>
  );
}

export default TasksPage;
