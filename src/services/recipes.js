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
  let recipes = [];
  let shuffled = recipe_previews.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, amount);
  return { data: { recipes: selected } };
}


export function mockGetRecipeFullDetails(recipeId) {
  // return { data: { recipe: recipe_full_view } };

  const recipe = recipe_full_view.find(recipe => recipe.id === recipeId);
  if (recipe) {
    return { status: 200, data: { recipe: recipe } };
  } else {
    return { status: 404, error: "Recipe not found", data: null };
  }

}

// Function to retrieve favorite recipes based on stored IDs
export function mockGetFavoriteRecipes() {
  const favoriteRecipesIds = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const favoriteRecipes = [];
  
  
  favoriteRecipesIds.forEach(recipeId => {
    // Find the recipe object with matching ID in either previews or full view
    const recipe = recipe_previews.find(recipe => recipe.id === recipeId) ||
                   recipe_full_view.find(recipe => recipe.id === recipeId);
    
    if (recipe) {
      favoriteRecipes.push(recipe);
      
    }
  });

  return { data: { recipes: favoriteRecipes } };
}

export function mockGetLastViewedRecipes() {
  const lastWatchedRecipesIds = JSON.parse(localStorage.getItem('lastWatchedRecipes')) || [];
  const lastWatchedRecipes = [];
  
  
  lastWatchedRecipesIds.forEach(recipeId => {
    // Find the recipe object with matching ID in either previews or full view
    const recipe = recipe_previews.find(recipe => recipe.id === recipeId) ||
                   recipe_full_view.find(recipe => recipe.id === recipeId);
    
    if (recipe) {
      lastWatchedRecipes.push(recipe);
      
    }
  });

  return { data: { recipes: lastWatchedRecipes } };
}

