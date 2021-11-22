import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./navStyle.css";

const topNavHome = () => {
  return (
    <Navbar className="color-nav" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand className="title" href="/">
          PlantMe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="plants" href="/plants">
              Plants
            </Nav.Link>
            <Nav.Link className="admin" href="/admin">
              Admin
            </Nav.Link>
            <Nav.Link className="aboutUs" href="/about">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default topNavHome;
