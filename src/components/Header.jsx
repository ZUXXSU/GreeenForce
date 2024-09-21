import React, { useState, useEffect } from 'react';

function Header({ darkMode, toggleDarkMode }) {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo fade-in">
          <img src="https://www.green-force.co/assets/images/logo.png" alt="Green Force Inc. Logo" />
        </div>
        <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={isNavVisible ? 'visible' : ''}>
          <ul>
            <li><a href="#home" onClick={() => setIsNavVisible(false)}>Home</a></li>
            <li><a href="#services" onClick={() => setIsNavVisible(false)}>Services</a></li>
            <li><a href="#testimonials" onClick={() => setIsNavVisible(false)}>Testimonials</a></li>
            <li><a href="#achievements" onClick={() => setIsNavVisible(false)}>Achievements</a></li>
            <li><a href="#contact" onClick={() => setIsNavVisible(false)}>Contact</a></li>
          </ul>
        </nav>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default Header;

// Styles
const styles = `
  .header {
    background-color: var(--card-background);
    padding: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: background-color 0.3s, box-shadow 0.3s;
  }

  .header.scrolled {
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .logo img {
    height: 50px;
    transition: transform 0.3s;
  }

  .logo img:hover {
    transform: scale(1.05);
  }

  nav ul {
    display: flex;
    list-style: none;
  }

  nav ul li {
    margin-left: 20px;
  }

  nav ul li a {
    text-decoration: none;
    color: var(--text-color);
    transition: color 0.3s;
    position: relative;
  }

  nav ul li a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s;
  }

  nav ul li a:hover::after {
    width: 100%;
  }

  .dark-mode-toggle {
    background: none;
    border: 1px solid var(--text-color);
    color: var(--text-color);
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .dark-mode-toggle:hover {
    background-color: var(--text-color);
    color: var(--background-color);
  }

  .nav-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  .nav-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: var(--text-color);
    margin: 5px 0;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    .nav-toggle {
      display: block;
    }

    nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--card-background);
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    nav.visible {
      max-height: 300px;
    }

    nav ul {
      flex-direction: column;
      padding: 20px;
    }

    nav ul li {
      margin: 10px 0;
    }

    .dark-mode-toggle {
      margin-left: 20px;
    }
  }

  .fade-in {
    animation: fadeIn 1s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);