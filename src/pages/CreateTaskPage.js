import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";

function CreateTaskPage() {
  const { loggedInUser } = useContext(UserContext);
  const [allClients, setAllClients] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [isClient, setIsClient] = useState(true);

  const [selectedClients, setSelectedClients] = useState([]);

  useEffect(() => {
    async function grabAllClients() {
      let apiResult = await TaxRiseAPI.getAllClients();
      console.log(
        "🚀 ~ file: CreateTaskPage.js:16 ~ grabAllTasks ~ apiResult:",
        apiResult
      );

      setAllClients(apiResult);
    }
    grabAllClients();
  }, []);
  return (
    <div>
      Made it to CREATE Tasks Page!
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Title</Form.Label>
          <Form.Control type="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control type="textarea" />
        </Form.Group>
        <Form.Select value={isClient}aria-label="Account Type">
          <option value={true}>Client</option>
          <option value={false}>Admin</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Create!
        </Button>
      </Form>{" "}
    </div>
  );
}

export default CreateTaskPage;
