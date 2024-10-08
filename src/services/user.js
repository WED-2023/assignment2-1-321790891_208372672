// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import api from "../services/api.js";


  export function mockAddFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  
  export async function getUserRecipes() {
    try {
      const response = await api.get('/users/recipes');
      return response.data; // Return the list of recipes
    } catch (error) {
      console.error('Error fetching user recipes:', error.message);
      throw error; // Throw error to handle it in the calling function
    }
  }
  
  export async function createRecipe(recipe) {
    try {
      console.log('Sending recipe to backend:', recipe);
      
      // Format ingredients
      const formattedIngredients = recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      }));
  
      // Format instructions to include step_number and description
      const formattedInstructions = recipe.instructions.map((instruction, index) => ({
        step_number: index + 1,  // Step numbers start from 1
        description: instruction,  // Assuming each instruction is a string
      }));
  
      // Prepare the payload
      const payload = {
        image: recipe.imageUrl,
        title: recipe.name,
        readyInMinutes: recipe.preparationTime,
        servings: recipe.portions,
        vegetarian: recipe.isVegetarian,
        vegan: recipe.isVegan,
        glutenFree: recipe.isGlutenFree,
        summary: recipe.summary,
        extendedIngredients: formattedIngredients,
        instructions: formattedInstructions,  // Include the formatted instructions
      };
  
      // Send the payload to the backend
      const response = await api.post('/users/recipes', payload);
      console.log('Recipe successfully created:', response.data);
  
      return response.data;  // Return response data if needed
    } catch (error) {
      console.error('Error sending recipe to backend:', error.message);
      throw error;
    }
  }


  export async function getPrivateRecipeFullDetails(recipeId) {
    // Send a GET request to the backend to fetch full details of the recipe
    try {
      const response = await api.get(`users/recipes/${recipeId}`)
      // Return the data received from the backend
      return response;
    } catch (error) {
      console.error('Error fetching full details of the recipe:', error.message);
      throw error;  // Propagate error for further handling
    }
  }
  