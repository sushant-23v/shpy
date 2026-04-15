import React from 'react';
import './LandingPage.css';
import coffeeImage from './images/coffee.jpg'; // Ensure this image is in the images folder

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to Shpy Coffee</h1>
        <nav>
          <ul>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <img src={coffeeImage} alt="Delicious coffee" />
          <h2>Your favorite coffee shop</h2>
          <p>Explore our specialty coffee and pastries, crafted with love.</p>
          <button>Order Now</button>
        </section>
        <section id="menu" className="menu">
          <h3>Our Menu</h3>
          <ul>
            <li>
              <h4>Espresso</h4>
              <p>A strong and bold coffee brewed by forcing hot water through finely-ground coffee.</p>
            </li>
            <li>
              <h4>Latte</h4>
              <p>A creamy coffee drink made with espresso and steamed milk.</p>
            </li>
            <li>
              <h4>Croissant</h4>
              <p>Flaky and buttery pastry, perfect with your coffee.</p>
            </li>
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p>Contact us: info@shpycoffee.com</p>
        <p>Follow us on social media!</p>
      </footer>
    </div>
  );
};

export default LandingPage;
