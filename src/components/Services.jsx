import React, { useState, useEffect, useRef } from 'react';

function Services() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const services = [
    { title: 'Solar Panel Installation', description: 'High-efficiency solar panels for residential and commercial use.' },
    { title: 'Wind Turbine Solutions', description: 'Custom wind energy solutions for various environments.' },
    { title: 'Energy Audits', description: 'Comprehensive energy audits to optimize your power consumption.' },
    { title: 'Green Consulting', description: 'Expert advice on sustainable practices and green technologies.' },
    { title: 'Energy Storage Systems', description: 'Advanced battery solutions for storing renewable energy.' },
    { title: 'Smart Grid Integration', description: 'Seamless integration of renewable sources into existing power grids.' },
    { title: 'Geothermal Energy', description: 'Harnessing Earth\'s heat for sustainable power generation.' },
    { title: 'Biomass Energy Solutions', description: 'Converting organic waste into clean, renewable energy.' },
    { title: 'Hydroelectric Power', description: 'Small-scale hydroelectric solutions for local communities.' },
    { title: 'Energy-Efficient Lighting', description: 'LED and smart lighting systems for reduced energy consumption.' },
    { title: 'Green Building Design', description: 'Sustainable architecture and construction practices.' },
    { title: 'Carbon Footprint Analysis', description: 'Detailed assessment and reduction strategies for carbon emissions.' }
  ];

  const duplicatedServices = [...services, ...services];

  useEffect(() => {
    const container = containerRef.current;
    
    const animate = () => {
      if (!isDragging) {
        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + 0.5;
          const containerWidth = container.scrollWidth / 2;
          return newPosition % containerWidth;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
    setScrollPosition(containerRef.current.scrollLeft);
  };

  return (
    <section className="services" id="services">
      <h2>Our Services</h2>
      <div 
        className="service-slider-container" 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="service-cards"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {duplicatedServices.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

// Styles
const styles = `
  .services {
    padding: 4rem 0;
    overflow: hidden;
  }

  .services h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: var(--primary-color);
  }

  .service-slider-container {
    width: 100%;
    overflow: hidden;
    cursor: grab;
  }

  .service-slider-container:active {
    cursor: grabbing;
  }

  .service-cards {
    display: flex;
    transition: transform 0.5s ease;
  }

  .service-card {
    flex: 0 0 300px;
    background-color: var(--card-background);
    border-radius: 10px;
    padding: 2rem;
    margin: 0 1rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }

  .service-card h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .service-card p {
    color: var(--text-color);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .service-card {
      flex: 0 0 250px;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);