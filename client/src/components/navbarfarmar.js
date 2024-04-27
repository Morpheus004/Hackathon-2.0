import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Outlet, useLoaderData}from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from "../utils/auth.js";
import { jwtDecode } from "jwt-decode";

function NavScrollExample() {
  const data=useLoaderData();
  console.log(data);
  return (
    <>
    <Navbar expand="lg" className="bg-darker-green">
      <Container fluid>
        <Navbar.Brand href="#" style={{ color: 'white' }}>Farmer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/farmer/mystore">MyStore</Nav.Link>
            <Nav.Link href="/farmer/store">Store</Nav.Link>
            <Nav.Link href="/farmer/cart">Cart</Nav.Link>
            <Nav.Link href="/farmer/profile">Profile</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </>
  );
}

export default NavScrollExample;



export async function farmerDataLoader(){
  try {
    const token = getAuthToken();
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;

    try {
      //enter route path
      const response = await axios.get(`http://localhost:9000/data/farmer/${email}`);
      const data = response.data;
      return { data };
    } catch (error) {
      console.error('Error fetching farmer data:', error);
      throw new Error('Failed to fetch farmer data');
    }
  } catch (error) {
    console.error('Error decoding auth token:', error);
    throw new Error('Invalid auth token');
  }
}