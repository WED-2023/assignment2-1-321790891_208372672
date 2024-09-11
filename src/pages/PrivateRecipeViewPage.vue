<template>
    <div class="container">
      <div v-if="recipe" class="recipe-container">
        <div class="header-image-container">
          <div class="recipe-header">
            <h1>{{ recipe.title }}</h1>
            <hr class="separator" />
            <div class="recipe-info">
            <p><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</p>
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
            <br>
            <p class="summary"><strong>About recipe:</strong> </p>
            <p><span v-html="recipe.summary"></span></p>
            <!-- <p><strong>Likes:</strong> {{ recipe.aggregateLikes }} likes</p> --> 
          </div>
          </div>
          <div class="image-container">
            <img :src="recipe.image" class="recipe-image" />
          </div>
        </div>


        <div class="recipe-body">
          <div class="recipe-ingredients">
            <h3>Ingredients:</h3>
            <ul>
              <li v-for="(r, index) in recipe.ingredients" :key="index + '_' + r.id">
                {{ r.amount + " " + r.unit + " of " + r.name}}
              </li>
            </ul>
          </div>
          <div class="recipe-instructions">
            <h3>Instructions:</h3>
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.description }}
              </li>
            </ol>
          </div>
        <!-- <pre>
        {{ $route.params }}
        {{ recipe }}
      </pre
        > -->
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { getPrivateRecipeFullDetails } from "../services/user.js";
  
  export default {
    data() {
      return {
        recipe: null
      };
    },
    mounted() {
      // Scroll to the top of the page when the component mounts
      window.scrollTo(0, 0);
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
  
      if (!viewedRecipes.includes(this.recipe.recipe_id)) {
        viewedRecipes.push(this.recipe.recipe_id);
      }
  
      localStorage.setItem('viewedRecipes', JSON.stringify(viewedRecipes));
    },
    async created() {
      try {
        let response;
        // response = this.$route.params.response;
  
        try {
          // response = await this.axios.get(
          //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
          //   {
          //     withCredentials: true
          //   }
          // );
          response = await getPrivateRecipeFullDetails(this.$route.params.recipeId);
          console.log(response.data.id);
          if (!response || response.status !== 200 || !response.data) {
            console.log("Invalid response or missing data:", response);
            this.$router.replace("/NotFound");
            return;
          }
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
  
        console.log(response.data);
        let {
          instructions,
          ingredients,
          readyInMinutes,
          image,
          title,
          id,
          summary,
          vegan,
          vegetarian,
          glutenFree
        } = response.data;


  
        let _recipe = {
          instructions,
          ingredients,
          readyInMinutes,
          image,
          title,
          id,
          summary,
          vegan,
          vegetarian,
          glutenFree
        };
  
        this.recipe = _recipe;
  
        // Add recipe to last watched recipes
        this.addToLastWatchedRecipes(_recipe);
  
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      addToLastWatchedRecipes(recipe) {
        // Retrieve last watched recipes from localStorage
        let lastWatchedRecipes = JSON.parse(localStorage.getItem("lastWatchedRecipes")) || [];
  
        // Add new recipe to the beginning of the array
        lastWatchedRecipes.unshift(recipe.id);
  
        // Ensure only up to 3 recipes are kept
        if (lastWatchedRecipes.length > 3) {
          lastWatchedRecipes = lastWatchedRecipes.slice(0, 3);
        }
  
        // Update localStorage with the updated last watched recipes
        localStorage.setItem("lastWatchedRecipes", JSON.stringify(lastWatchedRecipes));
        
      }
    }
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
    
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
  
  .recipe-ingredients,
  .recipe-instructions {
    background-color: #fafafa;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
  }
  
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