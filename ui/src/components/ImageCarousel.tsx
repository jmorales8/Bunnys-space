import React from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const numberOfImages = images.length;
  const degreePerImage = 360 / numberOfImages;

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            className="carousel-item"
            key={index}
            style={{ '--i': index, '--degree': `${degreePerImage}deg` } as React.CSSProperties}
          >
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;