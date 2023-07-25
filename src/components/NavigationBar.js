import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserContext from "../UserContext.js";

function NavigationBar() {
  const { logout, loggedInUser } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {loggedInUser ? (
            <Nav className="me-auto">
              <Navbar.Brand>Hi, {loggedInUser.username}!</Navbar.Brand>
              <Navbar.Text>
                {loggedInUser.isClient
                  ? "As a Client, you can view and address all of your assigned tasks."
                  : "As an Admin, you can view all created and assigned tasks."}
              </Navbar.Text>
              <Nav.Link onClick={logout}>logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Navbar.Brand>Welcome!</Navbar.Brand>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
