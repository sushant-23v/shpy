import { recipes } from "../../data/recipes";
import RecipeCard from "../RecipeCard";
import SectionHeading from "../ui/SectionHeading";

export default function MenuGrid() {
  return (
    <section id="menu" className="section">
      <SectionHeading
        title="Menu"
        subtitle="A dummy menu grid with attractive cards and metadata."
      />

      <div className="grid grid--3">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </section>
  );
}