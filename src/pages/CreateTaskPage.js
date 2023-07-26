import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";
const animatedComponents = makeAnimated();

function CreateTaskPage() {
  const { loggedInUser, setAlert, btnLoading, setBtnLoading } =
    useContext(UserContext);
  const [allClients, setAllClients] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [incompleteForm, setIncompleteForm] = useState(true);

  const [selectedClients, setSelectedClients] = useState([]);

  useEffect(() => {
    async function grabAllClients() {
      let apiResult = await TaxRiseAPI.getAllClients();

      if (apiResult.clients) {
        const tempClients = [];
        for (let item of apiResult.clients) {
          tempClients.push({
            value: item.username,
            label: item.username,
            color: "#0052CC",
          });
        }
        setAllClients(tempClients);
      } else {
        setAllClients(null);
      }
    }
    grabAllClients();
  }, []);


  useEffect(() => {
    if (
      title.length > 3 &&
      description.length > 3 &&
      selectedClients.length > 0
    ) {
      setIncompleteForm(false);
    } else {
      setIncompleteForm(true);
    }
  }, [title, description, selectedClients]);

  const createTask = async () => {
    try {
      setBtnLoading(true);
      let assignedClientUsernames = [];
      for (let obj of selectedClients) {
        assignedClientUsernames.push(obj.value);
      }
      const apiObject = {
        title,
        description,
        assignedClientUsernames,
        status: "To Do",
      };

      let apiResult = await TaxRiseAPI.createTask(apiObject);

      setBtnLoading(false);
    } catch (err) {
      setBtnLoading(false);
      console.log(err);

      setAlert({ message: err });
    }
  };

  return (
    <div>
      Made it to CREATE Tasks Page!
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Title</Form.Label>
          <Form.Control onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
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
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          disabled={incompleteForm || btnLoading}
          onClick={!btnLoading ? createTask : null}
        >
          {btnLoading ? "Creating..." : "Create Task"}
        </Button>
      </Form>
    </div>
  );
}

export default CreateTaskPage;
