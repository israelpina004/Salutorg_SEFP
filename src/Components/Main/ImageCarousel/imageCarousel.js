import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import "./imageCarousel.css";

const carouselData = [
  {
    imageUrl:
      "https://vastphotos.com/files/uploads/photos/10310/large-format-photo-print-of-mountains-and-lakes-l.jpg?v=20220712073521",
    title: "Item 1",
    link: "https://example.com/image",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    title: "Item 2",
    link: "https://example.com/singles",
  },
  {
    imageUrl:
      "https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg",
    title: "Item 3",
    link: "https://example.com/sealed-packs",
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const interactionTimeout = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    if (isInteracted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isInteracted]);

  // Interaction reset
  useEffect(() => {
    if (!isInteracted) return;

    clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      setIsInteracted(false);
    }, 3000);

    return () => clearTimeout(interactionTimeout.current);
  }, [isInteracted]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
    handleInteraction();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
    handleInteraction();
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    handleInteraction();
  };

  const handleInteraction = () => {
    setIsInteracted(true);
    clearTimeout(interactionTimeout.current);
  };

  return (
    <div
      className="carousel-container"
      style={{
        backgroundImage: `url(${carouselData[currentIndex].imageUrl})`,
      }}
    >
      <div className="carousel-content">
        <h1 className="heading-special">Trending Items</h1>
        {carouselData[currentIndex]?.link && (
          <a
            href={carouselData[currentIndex].link}
            className="item-title-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {carouselData[currentIndex].title} &gt;
          </a>
        )}
      </div>
      <button className="carousel-nav prev" onClick={handlePrev}>
        <ChevronLeft size={20} />
      </button>
      <button className="carousel-nav next" onClick={handleNext}>
        <ChevronRight size={20} />
      </button>
      <div className="carousel-dots">
        {carouselData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
