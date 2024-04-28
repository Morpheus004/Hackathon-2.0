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
  // Get the data passed from the loader
  const data = useRouteLoaderData("farmerloader");

  // Initialize the cartItems state with an empty array
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch cart items from the API
  const fetchCartItems = async (user_id) => {
    try {
      // Make a GET request to fetch selected product IDs for the user
      const response = await axios.get(
        `http://localhost:9000/store/api/selected-products/${user_id}`
      );
      const selectedProductIds = response.data;

      // Map over the selected product IDs and fetch product details for each
      const fetchedCartItems = await Promise.all(
        selectedProductIds.map(async (productId) => {
          const productResponse = await axios.get(
            `http://localhost:9000/store/api/products/p/${productId}`
          );
          return productResponse.data;
        })
      );

      console.log("Fetched cart items",fetchedCartItems); // Log the fetched cart items
      setCartItems(fetchedCartItems); // Update the cartItems state with fetched data
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Call the fetchCartItems function when the component mounts
  useEffect(() => {
    const user_id = data.data.user_id; // Replace with the actual user ID
    fetchCartItems(user_id);
  }, []);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.stock,
    0
  );

  // Function to remove an item from cart
  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  // Function to increase quantity of an item in cart
  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  // Function to decrease quantity of an item in cart
  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };
  console.log("Cart Items:",cartItems);
 
  return (
    <div className="container">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.product_id} className="row mb-3">
          <div className="col">
            <Card className="cart-item d-flex align-items-center">
              {/* <Card.Img src={item.image} alt={item.name} className="product-image" /> */}
              <ImageDisplay farmer_id={item.farmer_id} product_id={item.product_id}/>
              <Card.Body className="d-flex flex-grow-1 align-items-center justify-content-between">
                <div>
                  <Card.Title className="mb-0">{item.name}</Card.Title>
                  {/* <p>{item.name}</p> */}
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