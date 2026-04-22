export type Recipe = {
  id: string;
  name: string;
  description: string;
  price: number;
  prepMinutes: number;
  calories: number;
  imageUrl: string;
  tags: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
  featured?: boolean;
};