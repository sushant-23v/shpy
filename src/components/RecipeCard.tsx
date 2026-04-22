import type { Recipe } from "../types/recipe";
import Badge from "./ui/Badge";

function spicyLabel(level?: 0 | 1 | 2 | 3) {
  if (!level) return "Mild";
  if (level === 1) return "Warm";
  if (level === 2) return "Spicy";
  return "Extra Hot";
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="card">
      <div className="cardMedia">
        <img src={recipe.imageUrl} alt={recipe.name} loading="lazy" />
        <div className="cardOverlay">
          <span className="price">${recipe.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="cardBody">
        <div className="cardTop">
          <h3 className="cardTitle">{recipe.name}</h3>
          <div className="meta muted">
            {recipe.prepMinutes} min • {recipe.calories} cal •{" "}
            {spicyLabel(recipe.spicyLevel)}
          </div>
        </div>

        <p className="cardDesc muted">{recipe.description}</p>

        <div className="tagRow">
          {recipe.tags.slice(0, 3).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}