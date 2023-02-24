import Container from "react-bootstrap/Container";
import { icons } from "./assets";
import { Navbar } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>{icons.logo} Schema Wizard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Container>
    </Navbar>
  );
}
