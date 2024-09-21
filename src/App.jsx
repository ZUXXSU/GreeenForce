import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Achievements from './components/Achievements';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <Services />
      <Testimonials />
      <Achievements />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;