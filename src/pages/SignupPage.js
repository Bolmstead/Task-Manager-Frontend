import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext.js";
import Select from 'react-select'

function SignupPage() {
  const { signup, loggedInUser } = useContext(UserContext);

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    console.log(isClient);
  }, [isClient]);

  if (loggedInUser) {
    return <Navigate to="/tasks" replace={true} />;
  }

  return (
    <Form>
      <h1>Create Account</h1>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={(e) => setEnteredUsername(e.target.value)}
          type="email"
          placeholder="name@example.com"
          value={enteredUsername}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="********"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <Form.Select value={isClient} aria-label="Account Type">
          <option value={true}>Client</option>
          <option value={false}>Admin</option>
        </Form.Select>
        <Button
          onClick={() => signup(enteredUsername, enteredPassword, isClient)}
        >
          Create!
        </Button>
        <div>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </Form.Group>
    </Form>
  );
}

export default SignupPage;
