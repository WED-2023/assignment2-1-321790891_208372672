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
import { mockGetRecipesPreview, getRandomRecipes,mockGetLastViewedRecipes,getFavoriteRecipes,searchRecipes} from "../services/recipes.js";
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
    loadFavoritesMain: {
      type: Boolean,
      default: false
    },
    titleStyle: {
      type: Object,
      default: () => ({})
    },
    numSearch: {
      type: Number,
      default: 3
    },
    searchPage:{
      type: Boolean,
      default: false
    },
    mainPage: {
      type: Boolean,
      default: false
    },
    Private: {
      type: Boolean,
      default: false
    },
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
    if (this.loadFavoritesMain) {
      this.updateThreeFavoriteRecipes();
    }
    else if (this.loadLastViewed) {
      this.updateLastViewedRecipes();
    } 
    else if (this.searchPage) {
      this.updateRecipes(this.numSearch);
    } 
    else if (this.mainPage) {
      this.updateRandomRecipes(this.numSearch);
    }
    else if(this.Private){} 
    else {
      this.updateRecipes(this.numResults);
    }
  },
  methods: {
    async updateRecipes(numResults = 3, searchQuery = '', cuisines = [], diets = [], intolerances = []) {
    try {
      // Call the searchRecipes function with the provided parameters
      const recipes = await searchRecipes(
        searchQuery,
        cuisines,
        diets,
        intolerances,
        numResults
      );

      // Update the component's recipes with the fetched data
      this.recipes = recipes;
      this.recipesInternal = [...recipes];
      console.log("Updated Recipes:", recipes); // Debugging output
    } catch (error) {
      console.error('Error updating recipes:', error);
    }
  },
    async updateRandomRecipes(amountToFetch = 3) {
      try {
        // Await the promise returned by getRandomRecipes
        const recipes = await getRandomRecipes(amountToFetch); 
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
    async updateThreeFavoriteRecipes() {
      try {
        alert("main");
        // Call the API function to fetch favorite recipes
        const recipes = await getFavoriteRecipes();
        
        // Slice the array to get only the first 3 recipes
        const limitedRecipes = recipes.slice(0, 3);

        // Update the component's internal recipes with only 3 recipes
        this.recipesInternal = limitedRecipes;
        this.recipes = [...limitedRecipes]; // Update component's recipes array
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
