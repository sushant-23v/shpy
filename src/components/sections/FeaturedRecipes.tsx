import { recipes } from "../../data/recipes";
import RecipeCard from "../RecipeCard";
import SectionHeading from "../ui/SectionHeading";

export default function FeaturedRecipes() {
  const featured = recipes.filter((r) => r.featured);

  return (
    <section id="featured" className="section">
      <SectionHeading
        title="Featured Recipes"
        subtitle="Handpicked plates that look great and taste even better."
      />

      <div className="grid grid--3">
        {featured.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </section>
  );
}