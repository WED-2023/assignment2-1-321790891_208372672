<template>
  <div class="recipe-preview-list">
    <h3 class="list-title" :style="titleStyle">{{ title }}:</h3>
    <div class="recipes">
      <div v-for="r in recipes" :key="r.id" class="recipe-item">
        <RecipePreview :recipe="r" :isFamilyRecipe="false" :titleStyle="titleStyle" @toggle-favorite="handleToggleFavorite" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview, getRandomRecipes,mockGetLastViewedRecipes,getFavoriteRecipes} from "../services/recipes.js";
import { mockAddFavorite } from "../services/user.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    numResults: {
      type: Number,
      default: 3 // Default to 3 if not provided
    },
    recipes: {
      type: Array,
      default: () => [] // Default to an empty array if not provided
    },
    loadLastViewed: {
      type: Boolean,
      default: false
    },
    loadFavorites: {
      type: Boolean,
      default: false
    },
    titleStyle: {
      type: Object,
      default: () => ({})
    },
    numSearch: {
      type: Number,
      default: 5
    },
    searchPage:{
      type: Boolean,
      default: false
    },
    mainPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recipesInternal: this.recipes, // Use internal data property for recipes
      favoriteRecipes: [], // Initialize with an empty array
      numFavorites: 0 // Initialize numFavorites
    };
  },
  mounted() {
    // Check if the current route is the "Favorites" route
    if (this.loadFavorites) {
      this.updateFavoriteRecipes();
    }
    else if (this.loadLastViewed) {
      this.updateLastViewedRecipes();
    } 
    else if (this.searchPage) {
      this.updateRecipes(this.numSearch);
    } 
    else if (this.mainPage) {
      alert("main page");
      this.updateRandomRecipes(this.numSearch);
    } else {
      alert("regular");
      this.updateRandomRecipes(this.numResults);
    }
  },
  methods: {
    async updateRecipes(amountToFetch = 3) {
      try {
        // Call the new searchRecipes function and pass the required parameters
        const recipes = await searchRecipes(
          this.searchQuery,
          this.selectedFilters.cuisine,
          this.selectedFilters.diet,
          this.selectedFilters.intolerance,
          2
        );

        // Update the state with the fetched recipes
        this.recipes = recipes;
        this.showResults = true; // Display the search results
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
    async updateRandomRecipes(amountToFetch = 3) {
      try {
        alert("main page 2");
        // Await the promise returned by getRandomRecipes
        const recipes = await getRandomRecipes(2); //change later to amountToFetch
        this.recipesInternal = recipes; // Update internal state with the recipes
        this.recipes = [...recipes]; // Update component's recipes array
        console.log("Fetched random recipes:", recipes); // Debugging output
      } catch (error) {
        console.error("Error fetching random recipes:", error); // Log any errors
      }
    },
    async updateFavoriteRecipes() {
      try {
        // Call the new API function to fetch favorite recipes
        const recipes = await getFavoriteRecipes();
        
        // Update the component's recipes with the fetched favorites
        this.recipesInternal = recipes;
        this.recipes = [...recipes]; // Update component's recipes array
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    },
    async updateLastViewedRecipes() {
      try {
        const response = mockGetLastViewedRecipes();
        
        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async handleToggleFavorite(recipeId, isFavorite) {
      try {
        const response = await mockAddFavorite(recipeId);
        console.log(response.data.message);
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    recipes(newRecipes) {
      this.recipesInternal = newRecipes;
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe-preview-list {
  margin-bottom: 20px;
}

.list-title {
  margin-bottom: 10px;
  margin-left: 10px;
}

.recipes {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust gap as needed */
}

.recipe-item {
  /* Additional styling if needed */
}
</style>
