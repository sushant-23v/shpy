import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>Welcome to Our Website</h1>
                <p>Your journey begins here.</p>
            </header>
            <main className="landing-content">
                <section className="intro-section">
                    <h2>About Us</h2>
                    <p>We are committed to providing the best service possible.</p>
                </section>
                <section className="features-section">
                    <h2>Features</h2>
                    <ul>
                        <li>Feature 1: Fast Performance</li>
                        <li>Feature 2: User-Friendly Interface</li>
                        <li>Feature 3: 24/7 Support</li>
                    </ul>
                </section>
            </main>
            <footer className="landing-footer">
                <p>&copy; 2023 Our Website. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
