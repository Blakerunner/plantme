import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './navStyle.css';

const TopNavHomeAdmin = ({loginHandler}) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('plantme_token');
    sessionStorage.removeItem('plantme_token');
    loginHandler(false);
    history.push('/');
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
            <Nav.Link as={Link} to='/admin' className='admin'>
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to='/about' className='aboutUs'>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to='/documentation' className='documentation'>
              API Documentation
            </Nav.Link>
          </Nav>
          <Nav.Link as={Link} to='/mypage' className='mypage'>
            My Page
          </Nav.Link>
          <Button variant='outline-secondary' onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavHomeAdmin;
