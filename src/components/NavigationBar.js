import { useContext } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserContext from "../UserContext.js";

function NavigationBar() {
  const { logout, loggedInUser } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary ml-auto">
      {loggedInUser ? (
        <Container>
          <Navbar.Brand>Hi, {loggedInUser.username}!</Navbar.Brand>
          <Navbar.Text>
            {loggedInUser.isClient
              ? "As a Client, you can view and address all of your assigned Tasks."
              : "As an Admin, you can create and view all Tasks"}
          </Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {loggedInUser.isClient ? (
                <Nav.Link href="/my-tasks">My Tasks</Nav.Link>
              ) : (
                <Nav.Link href="/all-tasks">All Tasks</Nav.Link>
              )}

              <Nav.Link onClick={logout}>logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      ) : (
        <Container>
          <Navbar.Brand>Welcome!</Navbar.Brand>
        </Container>
      )}
    </Navbar>
  );
}

export default NavigationBar;
