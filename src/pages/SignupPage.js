import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext.js";

function SignupPage() {
  const { signup, loggedInUser, btnLoading } = useContext(UserContext);

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [accountType, setAccountType] = useState("Client");



  if (loggedInUser) {
    if (loggedInUser.isClient) {
      return <Navigate to="/my-tasks" replace={true} />;
    } else {
      return <Navigate to="/all-tasks" replace={true} />;
    }
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
        <Form.Select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          aria-label="Account Type"
        >
          <option value={"Client"}>Client</option>
          <option value={"Admin"}>Admin</option>
        </Form.Select>

        <Button
          variant="primary"
          disabled={
            btnLoading ||
            enteredPassword.length < 8 ||
            enteredUsername.length < 3
          }
          onClick={
            !btnLoading
              ? () => signup(enteredUsername, enteredPassword, accountType)
              : null
          }
        >
          {btnLoading ? "Loading…" : "Signup"}
        </Button>
        <div>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to="/login">
            Login
          </Link>
        </div>
      </Form.Group>
    </Form>
  );
}

export default SignupPage;
