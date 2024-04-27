import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function MyStore() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    organic: false
  });

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      stock: '',
      organic: false
    });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewProduct({ ...newProduct, [name]: newValue });
  };

  const handleSave = () => {
    if (selectedProduct) {
      const updatedProducts = products.map((product) => {
        if (product === selectedProduct) {
          return newProduct;
        }
        return product;
      });
      setProducts(updatedProducts);
    } else {
      setProducts([...products, newProduct]);
    }
    handleClose();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    handleShow();
  };

  const handleDelete = (product) => {
    const updatedProducts = products.filter((p) => p !== product);
    setProducts(updatedProducts);
  };

  return (
    <div className="container">
      <h2 style={{ marginTop: '20px' }}>Products</h2>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-3">
            <ProductCard
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Button variant="primary" onClick={handleShow}>Add Product</Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" name="name" value={newProduct.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control type="text" placeholder="Enter product description" name="description" value={newProduct.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="text" placeholder="Enter product price" name="price" value={newProduct.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productStock">
              <Form.Label>Product Stock</Form.Label>
              <Form.Control type="text" placeholder="Enter product stock" name="stock" value={newProduct.stock} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productOrganic">
              <Form.Check type="checkbox" label="Organic" name="organic" checked={newProduct.organic} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Description: {product.description}</Card.Text>
        <Card.Text>Price: {product.price}</Card.Text>
        <Card.Text>Stock: {product.stock}</Card.Text>
        <Card.Text>Organic: {product.organic ? 'Yes' : 'No'}</Card.Text>
        <Button variant="primary" onClick={onEdit} style={{ marginRight: '5px' }}>Edit</Button>
        <Button variant="danger" onClick={onDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default MyStore;
