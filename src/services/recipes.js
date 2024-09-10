// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_previews from "../assets/mocks/recipe_preview.json";
import api from "../main.js";
const routerPrefix = "recipes";

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

import family_recipe_full_view from "../assets/mocks/family_recipe_full_view.json";
import family_recipe_previews from "../assets/mocks/family_recipe_preview.json";

export function mockGetFamilyRecipesPreview(amount = 1) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    if (i < family_recipe_previews.length) {
      recipes.push(family_recipe_previews[i]);
    } else {
      // If the requested amount is greater than the available previews, reuse previews
      recipes.push(family_recipe_previews[i % family_recipe_previews.length]);
    }
  }

  return { data: { recipes: recipes } };
}


// Function to fetch random recipes
export async function getRandomRecipes(number = 3) {
  try {
    // Send a GET request to the backend to fetch random recipes
    const response = await api.get(`${routerPrefix}/random`, {
      params: { number }  // Optional query parameter for the number of recipes
    });
    
    // Return the data received from the backend
    return response.data;
  } catch (error) {
    console.error('Error fetching random recipes:', error.message);
    throw error;  // Propagate error for further handling
  }
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
export function mockGetFamilyRecipeFullDetails(recipeId) {
  const recipe = family_recipe_full_view.find(recipe => recipe.id === recipeId);
  if (recipe) {
    // Prepare instructions array
    const _instructions = recipe.analyzedInstructions.flatMap(instruction => instruction.steps);
    return { status: 200, data: { recipe: { ...recipe, _instructions } } };
  } else {
    return { status: 404, error: "Recipe not found", data: null };
  }
}
let recipes = [];

export function saveRecipe(recipe) {
  return new Promise((resolve, reject) => {
    try {
      recipes.push({ ...recipe, id: Date.now() }); // Add an ID to the recipe
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function getRecipes() {
  return new Promise((resolve) => {
    resolve(recipes);
  });
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
