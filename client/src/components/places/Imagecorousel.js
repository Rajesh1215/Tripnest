import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Row, Col } from 'react-bootstrap';

function ImageCarousel({ images1 }) {
  // Ensure that images1 is defined before trying to slice it
  const images = images1 ? images1.slice(0, 8) : [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <Row className="image-carousel">
      <Col className="main-carousel">
        <Carousel showStatus={false} showIndicators={false} selectedItem={selectedImageIndex} className=''>
          {images.map((image, index) => (
            <div key={index} onClick={() => handleImageClick(index)} className='h-100'>
              <div className="image-container h-100">
              <img
                  src={image+`?width=400&height=150`}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className='my-auto rounded'
                />
                {/* Add your image overlay or any other content here if needed */}
              </div>
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}

export default ImageCarousel;
