import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ImageDisplay from './ImageDisplay';

function OrganicProducts() {
  const [organicProducts, setOrganicProducts] = useState([]);

  useEffect(() => {
    fetchOrganicProducts();
  }, []);

  const fetchOrganicProducts = async () => {
    try {
      const response = await axios.get('http://localhost:9000/store/api/products');
      const allProducts = response.data;
      // Filter organic products
      const organicProducts = allProducts.filter(product => product.is_organic);
      setOrganicProducts(organicProducts);
    } catch (error) {
      console.error('Error fetching organic products:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Organic Products</h2>
      {organicProducts.length > 0 ? (
        <div className="row">
          {organicProducts.map(product => (
            <div key={product.product_id} className="col-lg-4 col-md-6 mb-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No organic products available</p>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  const { name, description, price, stock } = product;

  return (
    <Card>
      <ImageDisplay farmer_id={product.farmer_id} product_id={product.product_id} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Description: {description}</Card.Text>
        <Card.Text>Price: {price}</Card.Text>
        <Card.Text>Stock: {stock}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default OrganicProducts;
