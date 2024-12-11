import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import "./imageCarousel.css";

const carouselData = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1720048171596-6a7c81662434?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Name Brand for Cheap",
    link: "https://images.unsplash.com/photo-1720048171596-6a7c81662434?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1721332150382-d4114ee27eff?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Get Professional Services",
    link: "https://images.unsplash.com/photo-1721332150382-d4114ee27eff?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1733492866460-0d1151f17b0a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Style on a Budget",
    link: "https://images.unsplash.com/photo-1733492866460-0d1151f17b0a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        <h1 className="heading-special">Salutorg</h1>
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
