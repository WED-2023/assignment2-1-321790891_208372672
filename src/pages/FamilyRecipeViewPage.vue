<template>
  <div class="background-container">
    <div class="container">
      <div v-if="recipe" class="recipe-container">
        <div class="header-image-container">
          <div class="recipe-header">
            <h1>{{ recipe.title }}</h1>
            <hr class="separator" />
            <div class="recipe-info">
              <p><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</p>
              <p><strong>Likes:</strong> {{ recipe.aggregateLikes }} likes</p>
              <ul class="diet-icons">
                <li v-if="recipe.vegetarian">
                  <img src="@/assets/vegetarian.png" alt="Vegetarian" class="diet-icon" />
                </li>
                <li v-if="recipe.vegan">
                  <img src="@/assets/vegan.png" alt="Vegan" class="diet-icon" />
                </li>
                <li v-if="recipe.glutenFree">
                  <img src="@/assets/gluten.png" alt="Gluten-Free" class="diet-icon" />
                </li>
              </ul>
            </div>
          </div>
          <div class="image-container">
            <img :src="recipe.image" class="recipe-image" />
          </div>
        </div>
  
        <div class="recipe-body">
          <div class="recipe-about">
            <h3>About the recipe:</h3>
            <p>{{ recipe.summary }}</p>
          </div>
  
          <div class="recipe-ingredients">
            <h3>Ingredients:</h3>
            <ul>
              <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="recipe-instructions">
            <h3>Instructions:</h3>
            <ol>
              <li v-for="(s, index) in recipe._instructions" :key="index">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { mockGetFamilyRecipeFullDetails } from "../services/recipes.js";
  
  export default {
    data() {
      return {
        recipe: null
      };
    },
    watch: {
      '$route.params.recipeId': 'fetchRecipe'
    },
    mounted() {
      this.fetchRecipe();
    },
    methods: {
      fetchRecipe() {
        const recipeId = this.$route.params.recipeId;
        const response = mockGetFamilyRecipeFullDetails(recipeId);
        if (response.status === 200) {
          const recipe = response.data.recipe;
          if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
            recipe._instructions = recipe.analyzedInstructions
              .map(instruction => instruction.steps)
              .flat();
          } else {
            recipe._instructions = [];
          }
          this.recipe = recipe;
        } else {
          this.$router.replace("/NotFound");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
  }

  .background-container{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/view1.jpg');
  background-size: cover;
  background-position: center;
}
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .recipe-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    padding: 20px;
    background-color: #ffffff;  
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .header-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .recipe-header {
    text-align: center;
  }
  
  .recipe-header h1 {
    font-size: 2.5em;
    color: #333;
    margin: 0;
  }
  
  .separator {
    border: 0;
    border-top: 2px solid #e0e0e0;
    margin: 10px 0; 
  }
  
  .recipe-info {
    color: #777;
    font-size: 1.2em;
  }
  
  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .recipe-image {
    width: 900px;
    height: 500px;
    object-fit: cover;
    border: 5px solid #ffffff;  
    border-radius: 10px; 
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  
  .recipe-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
  
  .recipe-about,
  .recipe-ingredients,
  .recipe-instructions {
    background-color: #fafafa;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
  }
  
  .recipe-about h3,
  .recipe-ingredients h3,
  .recipe-instructions h3 {
    margin-top: 0;
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    color: #555;
  }
  
  .recipe-ingredients ul,
  .recipe-instructions ol {
    padding-left: 20px;
  }
  
  .recipe-ingredients li::marker,
  .recipe-instructions li::marker {
    color: #e97f29;
    font-weight: bold;
  }
  
  .recipe-ingredients li,
  .recipe-instructions li {
    margin-bottom: 10px;
    line-height: 1.5;
    font-size: 1.1em;
    color: #555;
  }

  .diet-icons {
  list-style: none; /* Removes the grey dots */
  display: flex; /* Aligns items in a row */
  padding: 0; /* Removes default padding */
  margin: 0; /* Removes default margin */
  justify-content: center; /* Centers items horizontally */
}

.diet-icons li {
  margin-left: 5px;
}

.diet-icon {
  width: 60px;
  height: 60px;
}
  </style>
  