// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_previews from "../assets/mocks/recipe_preview.json";

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    if (i < recipe_previews.length) {
      recipes.push(recipe_previews[i]);
    } else {
      // If the requested amount is greater than the available previews, reuse previews
      recipes.push(recipe_previews[i % recipe_previews.length]);
    }
  }

  return { data: { recipes: recipes } };
}

export function mockGetRandomRecipesPreview(amount = 1) {
  let shuffled = recipe_previews.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, amount);
  return { data: { recipes: selected } };
}


export function mockGetRecipeFullDetails(recipeId) {
  return { data: { recipe: recipe_full_view } };
}