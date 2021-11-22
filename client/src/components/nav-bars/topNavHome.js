import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navStyle.css";

const topNavHome = () => {
  return (
    <Navbar className="color-nav" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="title">
          PlantMe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/plants" className="plants">
              Plants
            </Nav.Link>
            <Nav.Link as={Link} to="/admin" className="admin">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="aboutUs">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default topNavHome;
