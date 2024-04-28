import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import './ReviewPagecss.css'; // Import custom CSS for styling

const ReviewPage = () => {
  const [reviews, setReviews] = useState({});
  const [submitted, setSubmitted] = useState({});

  const handleRatingChange = (productId, rating) => {
    if (!submitted[productId]) {
      setReviews(prevReviews => ({
        ...prevReviews,
        [productId]: { ...prevReviews[productId], rating }
      }));
    }
  };

  const handleReviewChange = (productId, review) => {
    if (!submitted[productId]) {
      setReviews(prevReviews => ({
        ...prevReviews,
        [productId]: { ...prevReviews[productId], review }
      }));
    }
  };

  const handleSubmit = (productId) => {
    console.log('Submitted Review for Product', productId, ':', reviews[productId]);
    setSubmitted(prevSubmitted => ({
      ...prevSubmitted,
      [productId]: true
    }));
  };

  const purchasedProducts = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1' },
    { id: 2, name: 'Product 2', description: 'Description for Product 2' },
    { id: 3, name: 'Product 3', description: 'Description for Product 3' }
  ];

  return (
    <div className="review-container">
      <h1 className="review-header">Review Your Purchased Products</h1>
      {purchasedProducts && purchasedProducts.length > 0 ? (
        purchasedProducts.map(product => (
          <Card key={product.id} className="product-card">
            <Card.Body>
              <Card.Title className="product-title">{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Form.Group controlId={`rating-${product.id}`} className="rating-group">
                <Form.Label className="rating-label">Rating:</Form.Label>
                <div className="rating-buttons">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-outline-secondary ${index < (reviews[product.id]?.rating || 0) ? 'selected' : ''}`}
                      onClick={() => handleRatingChange(product.id, index + 1)}
                      disabled={submitted[product.id]}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </Form.Group>
              <Form.Group controlId={`review-${product.id}`}>
                <Form.Label className="review-label">Review:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => handleReviewChange(product.id, e.target.value)}
                  disabled={submitted[product.id]}
                />
              </Form.Group>
              {submitted[product.id] && <p className="review-submitted">Review submitted</p>}
              {!submitted[product.id] && (
                <Button variant="primary" onClick={() => handleSubmit(product.id)}>
                  Submit Review
                </Button>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="no-products">No purchased products to review.</p>
      )}
    </div>
  );
};

export default ReviewPage;