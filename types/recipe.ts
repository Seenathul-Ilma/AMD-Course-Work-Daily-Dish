export interface Ingredient {
  icon: string;        
  ingredient: string;  // "Eggs"
  quantity: string;    // "2 large"
}

export interface RecipeStep {
  step: number;        // 1, 2, 3...
  instruction: string; // Detailed cooking instruction
}

export interface Recipe {
  recipeName: string;
  description: string;
  imagePrompt: string;

  ingredients: Ingredient[];
  steps: RecipeStep[];

  calories: number;
  cookTime: number;
  serveTo: number;
}
