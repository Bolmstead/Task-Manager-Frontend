import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";
const animatedComponents = makeAnimated();

function CreateTaskPage() {
  const { loggedInUser } = useContext(UserContext);
  const [allClients, setAllClients] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const [selectedClients, setSelectedClients] = useState([]);

  useEffect(() => {
    async function grabAllClients() {
      let apiResult = await TaxRiseAPI.getAllClients();
      console.log(
        "🚀 ~ file: CreateTaskPage.js:16 ~ grabAllTasks ~ apiResult:",
        apiResult
      );

      if (apiResult.clients) {
        const tempClients = [];
        for (let item of apiResult.clients) {
          tempClients.push({
            value: item.username,
            label: item.username,
            color: "#0052CC",
          });
        }
        console.log(tempClients);
        setAllClients(tempClients);
      } else {
        setAllClients(null);
      }
    }
    grabAllClients();
  }, []);

  useEffect(() => {
    console.log("selectedClients.length", selectedClients.length);
  }, [selectedClients]);

  return (
    <div>
      Made it to CREATE Tasks Page!
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Title</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
          <Form.Label>Assign to:</Form.Label>

          <Select
            options={allClients}
            isMulti
            components={animatedComponents}
            onChange={(selection) => setSelectedClients(selection)}
            styles={{
              option: (provided, state) => ({
                ...provided,
                color: "black",
              }),
            }}
          />
          {/* <Form.Select value={selectedClients} aria-label="Account Type">
            <option value={true}>Client</option>
            <option value={false}>Admin</option>
          </Form.Select> */}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={selectedClients.length < 1}
        >
          Create!
        </Button>
      </Form>
    </div>
  );
}

export default CreateTaskPage;
