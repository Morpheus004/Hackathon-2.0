import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ShoppingCart.css';

function ShoppingCart() {
  // Sample data for initial selected items
  const initialItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 1, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 30, quantity: 1, image: 'product3.jpg' }
  ];
  const [cartItems, setCartItems] = useState(initialItems);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to remove an item from cart
  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  // Function to increase quantity of an item in cart
  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  // Function to decrease quantity of an item in cart
  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="row mb-3">
          <div className="col">
            <Card className="cart-item d-flex align-items-center">
              <Card.Img src={item.image} alt={item.name} className="product-image" />
              <Card.Body className="d-flex flex-grow-1 align-items-center justify-content-between">
                <div>
                  <Card.Title className="mb-0">{item.name}</Card.Title>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="quantity-btn"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="quantity-value mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="quantity-btn"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant="light"
                  className="delete-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <p className="mb-2">Total: ${totalPrice}</p>
        <Button variant="primary">Proceed to Checkout</Button>
      </div>
    </div>
  );
}

export default ShoppingCart;