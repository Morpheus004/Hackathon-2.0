import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import farmerAvatar from './farmer-avatar.png'; // Import your farmer avatar image
import { useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';

const CustomerProfile = () => {
const data=useRouteLoaderData('customerloader');

  const initialUserData = {
    customer_id:data.data.customer_id,
    user_id: data.data.user_id,
    name: data.data.name,
    contact: data.data.contact,
    username: data.data.username,
    email: data.data.email,
    bio: data.data.bio,
    rating:data.data.rating,
  };

  const [userData, setUserData] = useState(initialUserData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempData, setTempData] = useState({ ...initialUserData });

  const handleEditModalOpen = () => {
    setTempData({ ...userData });
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:9000/customerprofile/api/customers/${data.data.user_id}`, tempData);
      if (response.status === 200) {
        setUserData(tempData);
        setShowEditModal(false);
      } else {
        console.error('Error updating user data:', response.data);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  const handleSave = handleSaveChanges;

  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card className="text-center">
          <Card.Img variant="top" src={farmerAvatar} style={{ maxWidth: '200px',margin: 'auto' }} />
            <Card.Body>
              <Card.Title>{userData.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">User ID: {userData.user_id}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Customer ID: {userData.customer_id}</Card.Subtitle>
              <Card.Text>
                <strong>Name:</strong> {userData.name}
              </Card.Text>
              <Card.Text>
                <strong>Contact:</strong> {userData.contact}
              </Card.Text>
              <Card.Text>
                <strong>Username:</strong> {userData.username}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {userData.email}
              </Card.Text>
              <Card.Text className="text-left">
                <strong>Bio:</strong> {userData.bio}
              </Card.Text>
              <Card.Text className="text-left">
                <strong>Rating:</strong> {userData.rating}
              </Card.Text>
              <Button variant="primary" onClick={handleEditModalOpen}>
                Edit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={tempData.name || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" value={tempData.contact || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} name="bio" value={tempData.bio || ''} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CustomerProfile;