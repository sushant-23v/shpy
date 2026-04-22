import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbarInner">
        <div className="brand">
          <span className="brandMark" />
          <span className="brandName">Saffron & Stone</span>
        </div>

        <nav className="navLinks">
          <a href="#featured">Featured</a>
          <a href="#menu">Menu</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="navCtas">
          <Button variant="ghost">View Menu</Button>
          <Button>Reserve</Button>
        </div>
      </div>
    </header>
  );
}