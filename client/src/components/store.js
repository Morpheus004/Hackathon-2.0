import React, { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import ImageDisplay from './ImageDisplay';
import { useRouteLoaderData } from "react-router-dom";

function Store() {
  const [products, setProducts] = useState([
    // {
    //   id: 1,
    //   name: 'Product 1',
    //   description: 'Description of Product 1',
    //   price: 10,
    //   stock: 100,
    //   is_organic: true
    // },
    // {
    //   id: 2,
    //   name: 'Product 2',
    //   description: 'Description of Product 2',
    //   price: 20,
    //   stock: 50,
    //   is_organic: false
    // },
    // {
    //   id: 3,
    //   name: 'Product 3',
    //   description: 'Description of Product 3',
    //   price: 30,
    //   stock: 75,
    //   is_organic: true
    // }
  ]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const data=useRouteLoaderData('farmerloader');
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/store/api/products`);;
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  
  const [status,setStatus]=useState(null);
  const [orderid,setOrderid]=useState(null);
  useEffect(() => {
    console.log(status); // This will log the updated status
  }, [status]);
  
  useEffect(() => {
    console.log(orderid); // This will log the updated orderid
  }, [orderid]);
  
  const handleAddToCart = async(product) => {
    if(status===null){
      const response = await axios.post(
        "http://localhost:9000/store/api/products/" + data.data.user_id
      );
      
      const oid=response.data.order_id;
      setOrderid(oid);
      setStatus('cart');
    }
    const response2 = await axios.post(
        "http://localhost:9000/store/api/orderitems/" + orderid,{pid:product.product_id,quantity:product.quantity,price:product.price}
      );

    setCartItems([...cartItems, product]);
    setSelectedProducts([...selectedProducts, product]);
    setMessage(`${product.name} added to cart`);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }
  return (
    <div className="container">
      <h2 style={{ marginTop: '20px' }}>Products</h2>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-3">
            <ProductCard
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              isSelected={selectedProducts.some(selectedProduct => selectedProduct.id === product.id)}
            />
          </div>
        ))}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

function ProductCard({ product, onAddToCart, isSelected }) {
  const cardStyle = {
    marginBottom: '10px',
    backgroundColor: isSelected ? '#f0f0f0' : 'inherit'
  };

  return (
    <Card style={cardStyle}>
      <ImageDisplay farmer_id={product.farmer_id} product_id={product.product_id} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Description: {product.description}</Card.Text>
        <Card.Text>Price: {product.price}</Card.Text>
        <Card.Text>Stock: {product.stock}</Card.Text>
        <Card.Text>Organic: {product.is_organic ? 'Yes' : 'No'}</Card.Text>
        <Button
          variant="primary"
          onClick={onAddToCart}
          disabled={isSelected}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {isSelected ? 'Added to Cart' : 'Add to Cart'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Store;