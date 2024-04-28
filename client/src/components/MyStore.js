import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import FileUpload from "./FileUpload";
import ImageDisplay from "./ImageDisplay.js";
function MyStore() {
  const data = useRouteLoaderData("farmerloader");
  // const farmer_id=data.fa
  // console.log(data);
  // console.log(data.data.farmer_id);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    organic: false,
  });
  const [productImages, setProductImages] = useState({});
  useEffect(() => {
    fetchProducts();
    fetchProductImages();
  }, []);
  const fetchProductImages = async () => {
    try {
      const imageUrls = {};
      for (const product of products) {
        const response = await axios.get(
          `http://localhost:9000/file/image/${data.data.farmer_id}/${product.product_id}`,
          { responseType: "blob" }
        );
        if (response.data) {
          const imageUrl = URL.createObjectURL(response.data);
          imageUrls[product.product_id] = imageUrl;
        }
      }
      setProductImages(imageUrls);
      console.log(imageUrls);
    } catch (error) {
      console.error("Error fetching product images:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/product/api/products/" + data.data.farmer_id
      );
      const product = response.data;
      console.log("Products:", product);
      setProducts(product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      organic: false,
    });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewProduct({ ...newProduct, [name]: newValue });
  };

  const handleSave = async () => {
    try {
      if (selectedProduct) {
        const response = await axios.put(
          `http://localhost:9000/product/api/products/${selectedProduct.product_id}`,
          newProduct
        );
        const updatedProduct = response.data;
        const updatedProducts = products.map((product) => {
          if (product.product_id === updatedProduct.product_id) {
            return updatedProduct;
          }
          return product;
        });
        setProducts(updatedProducts);
      } else {
        // Add new product
        const response = await axios.post(
          "http://localhost:9000/product/api/products/" + data.data.farmer_id,
          newProduct
        );
        const addedProduct = response.data;
        setProducts([...products, addedProduct]);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    handleShow();
  };

  const handleDelete = async (product) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/product/api/products/${product.product_id}`
      );
      if (response.status === 204) {
        const updatedProducts = products.filter(
          (p) => p.product_id !== product.product_id
        );
        setProducts(updatedProducts);
      } else {
        console.error("Error deleting product:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const fid = data.data.fid;

  return (
    <div className="container">
      <h2 style={{ marginTop: "20px" }}>Products</h2>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-3">
            <ProductCard
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product)}
              farmer_id={fid}
              productImages={productImages}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productStock">
              <Form.Label>Product Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product stock"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productOrganic">
              <Form.Check
                type="checkbox"
                label="Organic"
                name="organic"
                checked={newProduct.organic}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function ProductCard({ product, onEdit, onDelete, farmer_id }) {
  // console.log(product.);
  return (
    <Card style={{ marginBottom: "10px" }}>
      <ImageDisplay farmer_id={product.farmer_id} product_id={product.product_id} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Description: {product.description}</Card.Text>
        <Card.Text>Price: {product.price}</Card.Text>
        <Card.Text>Stock: {product.stock}</Card.Text>
        <Card.Text>Organic: {product.is_organic ? "Yes" : "No"}</Card.Text>
        <Button
          variant="primary"
          onClick={onEdit}
          style={{ marginRight: "5px" }}
        >
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        <FileUpload userInfo={product.farmer_id} pid={product.product_id} />
      </Card.Body>
    </Card>
  );
}

export default MyStore;