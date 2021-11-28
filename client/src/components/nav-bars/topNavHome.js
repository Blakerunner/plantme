import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import './navStyle.css';

const TopNavHome = () => {
  const history = useHistory();

  const goToLogin = () => {
    history.push('/login');
  };
  
  return (
    <Navbar className='color-nav' collapseOnSelect expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='title'>
          PlantMe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/plants' className='plants'>
              Plants
            </Nav.Link>
            <Nav.Link as={Link} to='/about' className='aboutUs'>
              About Us
            </Nav.Link>
          </Nav>
          <Button variant='outline-secondary' onClick={goToLogin}>
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavHome;
