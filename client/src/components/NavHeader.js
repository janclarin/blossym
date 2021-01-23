import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavHeader() {
  return (
    <Navbar bg="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Blossym</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/fan">
            <Nav.Link>Fan</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/creator">
            <Nav.Link>Creator</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
