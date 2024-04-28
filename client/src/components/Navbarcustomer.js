import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from "../utils/auth.js";
import { jwtDecode } from "jwt-decode";


function NavScroll() {
  return (
    <>
      <Navbar expand="lg" className="bg-darker-green">
        <Container fluid>
          <Navbar.Brand href="#" >Customer</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/customer/cart">Cart</Nav.Link>
              <Nav.Link href="/customer/profile" >Profile</Nav.Link>
              <Nav.Link href="/customer/store">Store</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavScroll;

export async function customerDataLoader(){
    try {
      const token = getAuthToken();
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
  
      try {
        //enter route path
        const response = await axios.get(`http://localhost:9000/data/customer/${email}`);
        const data = response.data;
        return { data };
      } catch (error) {
        console.error('Error fetching customer data:', error);
        throw new Error('Failed to fetch customer data');
      }
    } catch (error) {
      console.error('Error decoding auth token:', error);
      throw new Error('Invalid auth token');
    }
  }