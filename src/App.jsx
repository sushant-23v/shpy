import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from 'react-router-dom';

function Layout() {
  const containerStyle = {
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 1.5,
    padding: '2rem',
    color: '#2b2119',
    backgroundColor: '#fffaf5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 800,
    fontSize: '1.25rem',
    color: '#3c2a1e',
    textDecoration: 'none',
  };

  const navStyle = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  };

  const linkStyle = ({ isActive }) => ({
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    textDecoration: 'none',
    color: isActive ? '#fff' : '#3c2a1e',
    background: isActive ? '#6b4f3a' : 'transparent',
    border: '1px solid #6b4f3a',
    transition: 'background 0.15s ease, color 0.15s ease',
  });

  const footerStyle = {
    borderTop: '1px solid #eadfd6',
    marginTop: 'auto',
    paddingTop: '1rem',
    fontSize: '0.875rem',
    color: '#6b4f3a',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <a href="/" style={brandStyle} aria-label="Bean & Brew Coffee Co. Home">
          <span role="img" aria-label="coffee">☕</span>
          <span>Bean & Brew Coffee Co.</span>
        </a>
        <nav style={navStyle} aria-label="Primary">
          <NavLink to="/" end style={linkStyle}>
            Landing
          </NavLink>
          <NavLink to="/home" style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/menu" style={linkStyle}>
            Menu
          </NavLink>
          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>
          <NavLink to="/contact" style={linkStyle}>
            Contact
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer style={footerStyle}>
        © {new Date().getFullYear()} Bean & Brew Coffee Co. • Crafted with care
      </footer>
    </div>
  );
}

function LandingPage() {
  const heroStyle = {
    display: 'grid',
    gap: '1rem',
    alignItems: 'start',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 900,
    margin: 0,
    color: '#3c2a1e',
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    margin: 0,
    color: '#5b4637',
    maxWidth: '50ch',
  };

  const ctaRowStyle = {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
  };

  const primaryCta = {
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    textDecoration: 'none',
    color: '#fff',
    background: '#6b4f3a',
    border: '1px solid #6b4f3a',
    fontWeight: 700,
  };

  const secondaryCta = {
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    textDecoration: 'none',
    color: '#3c2a1e',
    background: 'transparent',
    border: '1px solid #6b4f3a',
    fontWeight: 700,
  };

  const badgeRow = {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap',
    color: '#6b4f3a',
    fontSize: '0.95rem',
  };

  const badge = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '999px',
    background: '#fff',
    border: '1px solid #eadfd6',
  };

  return (
    <section style={heroStyle} aria-labelledby="landing-title">
      <h1 id="landing-title" style={titleStyle}>
        Wake up your day with perfectly roasted coffee
      </h1>
      <p style={subtitleStyle}>
        Small-batch, ethically sourced beans brewed to perfection. Stop by for your
        morning ritual or linger over a latte with friends.
      </p>
      <div style={badgeRow}>
        <span style={badge}>
          <span role="img" aria-label="bean">🫘</span>
          Single-origin
        </span>
        <span style={badge}>
          <span role="img" aria-label="leaf">🌿</span>
          Sustainable
        </span>
        <span style={badge}>
          <span role="img" aria-label="sparkles">✨</span>
          Fresh daily
        </span>
      </div>
      <div style={ctaRowStyle}>
        <NavLink to="/menu" style={() => primaryCta}>
          View Menu
        </NavLink>
        <NavLink to="/contact" style={() => secondaryCta}>
          Find Us
        </NavLink>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <section aria-labelledby="home-title">
      <h2 id="home-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3c2a1e' }}>
        Welcome Home
      </h2>
      <p style={{ maxWidth: '65ch', color: '#5b4637' }}>
        Bean & Brew is your neighborhood spot for espresso classics, seasonal
        specialties, and friendly faces. We roast weekly and brew with care.
      </p>
    </section>
  );
}

function MenuPage() {
  const listStyle = {
    display: 'grid',
    gap: '0.5rem',
    padding: 0,
    listStyle: 'none',
    maxWidth: '50ch',
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px dashed #eadfd6',
    padding: '0.4rem 0',
    color: '#3c2a1e',
  };

  return (
    <section aria-labelledby="menu-title">
      <h2 id="menu-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3c2a1e' }}>
        Menu
      </h2>
      <ul style={listStyle}>
        <li style={itemStyle}><span>Espresso</span><span>$3.00</span></li>
        <li style={itemStyle}><span>Americano</span><span>$3.50</span></li>
        <li style={itemStyle}><span>Cappuccino</span><span>$4.25</span></li>
        <li style={itemStyle}><span>Latte</span><span>$4.50</span></li>
        <li style={itemStyle}><span>Mocha</span><span>$4.75</span></li>
        <li style={itemStyle}><span>Cold Brew</span><span>$4.25</span></li>
        <li style={itemStyle}><span>Matcha Latte</span><span>$4.75</span></li>
        <li style={itemStyle}><span>Chai Latte</span><span>$4.50</span></li>
      </ul>
      <p style={{ marginTop: '0.75rem', color: '#6b4f3a' }}>
        Oat, almond, and soy milk available. Add flavors: vanilla, caramel, hazelnut.
      </p>
    </section>
  );
}

function AboutPage() {
  return (
    <section aria-labelledby="about-title">
      <h2 id="about-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3c2a1e' }}>
        Our Story
      </h2>
      <p style={{ maxWidth: '65ch', color: '#5b4637' }}>
        We started Bean & Brew with a simple idea: make great coffee accessible to
        everyone. From sourcing to roasting to brewing, we obsess over the details
        so your cup can be simply delightful.
      </p>
    </section>
  );
}

function ContactPage() {
  const infoStyle = { margin: 0, color: '#5b4637' };
  const gridStyle = {
    display: 'grid',
    gap: '0.25rem',
    marginTop: '0.5rem',
  };

  return (
    <section aria-labelledby="contact-title">
      <h2 id="contact-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3c2a1e' }}>
        Contact & Hours
      </h2>
      <div style={gridStyle}>
        <p style={infoStyle}>123 Roastery Lane, Brewtown, BT 90210</p>
        <p style={infoStyle}>Mon–Fri: 7:00–18:00 • Sat–Sun: 8:00–16:00</p>
        <p style={infoStyle}>Phone: (555) 123-4567</p>
        <p style={infoStyle}>Email: hello@beanandbrew.example</p>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section aria-labelledby="notfound-title">
      <h2 id="notfound-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3c2a1e' }}>
        404 — Page Not Found
      </h2>
      <p style={{ maxWidth: '65ch', color: '#5b4637' }}>
        The page you’re looking for has moved or doesn’t exist. Try the navigation above.
      </p>
    </section>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
