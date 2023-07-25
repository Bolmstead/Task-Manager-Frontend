import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext.js";

function LoginPage() {
  const { login, loggedInUser, btnLoading } = useContext(UserContext);

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  if (loggedInUser) {
    return <Navigate to="/tasks" replace={true} />;
  }

  return (
    <Form>
      <h1>Login</h1>
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

        <Button
          variant="primary"
          disabled={btnLoading}
          onClick={
            !btnLoading ? () => login(enteredUsername, enteredPassword) : null
          }
        >
          {btnLoading ? "Loading…" : "Login"}
        </Button>
        <div>
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </Form.Group>
    </Form>
  );
}

export default LoginPage;
