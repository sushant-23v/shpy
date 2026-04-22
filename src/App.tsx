import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import FeaturedRecipes from "./components/sections/FeaturedRecipes";
import MenuGrid from "./components/sections/MenuGrid";
import Container from "./components/layout/Container";

export default function App() {
  return (
    <div className="appShell">
      <Navbar />

      <main>
        <Hero />

        <Container>
          <FeaturedRecipes />
          <MenuGrid />
        </Container>
      </main>

      <Footer />
    </div>
  );
}