import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../image/img-1.png';
import './home.css'; // Import your CSS file

function CarouselHome() {
  return (
    <div className="background-image">
    
      <Carousel className="my-carousel">
        <Carousel.Item className="carousel-item">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <img src={CarouselImage} alt="First slide" className="carousel-image" />
            </div>
            <div className="col-md-6 order-md-1">
              <Carousel.Caption className="carousel-caption">
                <h2 className="caption-title1">Dedicated</h2>
                <h5 className="caption-title2">To Building Farms</h5>
                <p className="caption-text">IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED BY THE READABLE CONTENT</p>
              </Carousel.Caption>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <img src={CarouselImage} alt="Second slide" className="carousel-image" />
            </div>
            <div className="col-md-6 order-md-1">
              <Carousel.Caption className="carousel-caption">
              <h2 className="caption-title1">Dedicated</h2>
                <h5 className="caption-title2">To Building Farms</h5>
                <p className="caption-text">IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED BY THE READABLE CONTENT</p>
              </Carousel.Caption>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <img src={CarouselImage} alt="Third slide" className="carousel-image" />
            </div>
            <div className="col-md-6 order-md-1">
              <Carousel.Caption className="carousel-caption">
              <h2 className="caption-title1">Dedicated</h2>
                <h5 className="caption-title2">To Building Farms</h5>
                <p className="caption-text">IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED BY THE READABLE CONTENT</p>
              </Carousel.Caption>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselHome;