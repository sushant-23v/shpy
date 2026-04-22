import type { Recipe } from "../types/recipe";

export const recipes: Recipe[] = [
  {
    id: "r1",
    name: "Smoky Butter Chicken",
    description: "Creamy tomato gravy, char-kissed chicken, and warm spices.",
    price: 14.99,
    prepMinutes: 25,
    calories: 720,
    imageUrl:
      "https://images.unsplash.com/photo-1604908554027-3730c4f0f7d9?auto=format&fit=crop&w=1400&q=80",
    tags: ["Popular", "Creamy", "North Indian"],
    spicyLevel: 1,
    featured: true,
  },
  {
    id: "r2",
    name: "Charred Paneer Tikka Bowl",
    description: "Tandoor-style paneer with herby rice and mint yogurt.",
    price: 12.5,
    prepMinutes: 20,
    calories: 640,
    imageUrl:
      "https://images.unsplash.com/photo-1627662236973-4fd835a41b03?auto=format&fit=crop&w=1400&q=80",
    tags: ["Veg", "High Protein"],
    spicyLevel: 2,
    featured: true,
  },
  {
    id: "r3",
    name: "Truffle Mushroom Pasta",
    description: "Silky sauce, sautéed mushrooms, parmesan, and truffle aroma.",
    price: 16.0,
    prepMinutes: 18,
    calories: 810,
    imageUrl:
      "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8e8b?auto=format&fit=crop&w=1400&q=80",
    tags: ["Italian", "Chef’s Special"],
    spicyLevel: 0,
    featured: true,
  },
  {
    id: "r4",
    name: "Crispy Chili Fries",
    description: "Golden fries tossed in house chili glaze + crunchy topping.",
    price: 6.99,
    prepMinutes: 12,
    calories: 540,
    imageUrl:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1400&q=80",
    tags: ["Snacks", "Spicy"],
    spicyLevel: 3,
  },
  {
    id: "r5",
    name: "Citrus Salmon Plate",
    description: "Pan-seared salmon with citrus butter and seasonal greens.",
    price: 18.5,
    prepMinutes: 22,
    calories: 690,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1400&q=80",
    tags: ["Seafood", "Fresh"],
    spicyLevel: 0,
  },
  {
    id: "r6",
    name: "Classic Margherita Pizza",
    description: "San Marzano tomato, mozzarella, basil—simple and perfect.",
    price: 11.99,
    prepMinutes: 15,
    calories: 760,
    imageUrl:
      "https://images.unsplash.com/photo-1548365328-8b849e6f4c3a?auto=format&fit=crop&w=1400&q=80",
    tags: ["Italian", "Veg", "Kids Fav"],
    spicyLevel: 0,
  },
];