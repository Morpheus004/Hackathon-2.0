import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageDisplay({ farmer_id, product_id }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchImage();
  }, [farmer_id, product_id]);

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/file/image/${farmer_id}/${product_id}`,
        { responseType: 'blob' }
      ); 
      if (response.data) {
        const imageBlob = URL.createObjectURL(response.data);
        setImageUrl(imageBlob);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <img
      src={imageUrl}
      alt=""
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
      }}
    />
  );
}

export default ImageDisplay;