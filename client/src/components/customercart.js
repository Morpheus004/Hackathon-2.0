import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import "./ShoppingCart.css";
import ImageDisplay from './ImageDisplay';

function ShoppingCart() {
  const data = useRouteLoaderData("farmerloader");
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/store/api/selected-products/${user_id}`
      );
      const selectedProductIds = response.data;

      const fetchedCartItems = await Promise.all(
        selectedProductIds.map(async (productId) => {
          const productResponse = await axios.get(
            `http://localhost:9000/store/api/products/p/${productId}`
          );
          return { ...productResponse.data, quantity: 1 }; // Add quantity property to each item
        })
      );

      console.log("Fetched cart items", fetchedCartItems);
      setCartItems(fetchedCartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const user_id = data.data.user_id;
    fetchCartItems(user_id);
  }, []);

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter((item) => item.product_id !== id);
    setCartItems(updatedItems);
  };

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.product_id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.product_id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  // Calculate total price based on the price and quantity of each item
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      // Update quantity of each item in order_item table
      await Promise.all(
        cartItems.map(async (item) => {
          await axios.put(`http://localhost:9000/store/api/update-quantity/${item.product_id}`, {
            quantity: item.quantity
          });
        })
      );
      const oid=localStorage.getItem('orderId');
      // Calculate total amount
      const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      // Update total amount and status in the orders table
      await axios.put(`http://localhost:9000/store/api/checkout`, {
        order_id:oid,
        total_amount: totalAmount
      });

      // Reset cart after successful checkout
      setCartItems([]);
    localStorage.removeItem('orderId');
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.product_id} className="row mb-3">
          <div className="col">
            <Card className="cart-item d-flex align-items-center">
              <ImageDisplay farmer_id={item.farmer_id} product_id={item.product_id} />
              <Card.Body className="d-flex flex-grow-1 align-items-center justify-content-between">
                <div>
                  <Card.Title className="mb-0">{item.name}</Card.Title>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="quantity-btn"
                      onClick={() => decreaseQuantity(item.product_id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="quantity-value mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="quantity-btn"
                      onClick={() => increaseQuantity(item.product_id)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant="light"
                  className="delete-btn"
                  onClick={() => removeFromCart(item.product_id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <p className="mb-2">Total: {totalPrice.toFixed(2)}</p>
        <Button variant="primary" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default ShoppingCart;
