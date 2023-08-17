import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={true}
      showStatus={true}
      showIndicators={true}
      interval={3000} // 3 seconds
      renderArrowPrev={(clickHandler, hasPrev) =>
        hasPrev && (
          <button
            type="button"
            onClick={clickHandler}
            title="Previous"
            className="carousel-button carousel-button-prev"
          >
            &#9664;
          </button>
        )
      }
      renderArrowNext={(clickHandler, hasNext) =>
        hasNext && (
          <button
            type="button"
            onClick={clickHandler}
            title="Next"
            className="carousel-button carousel-button-next"
          >
            &#9654;
          </button>
        )
      }
    >
      {images.map((image, index) => (
        <div key={index} className="carousel-image-container">
          <img src={image} alt={`Image ${index}`} className="carousel-image" />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
