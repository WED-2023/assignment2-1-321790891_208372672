<template>
  <div class="recipe-preview-list">
    <h3 class="list-title">{{ title }}:</h3>
    <div class="recipes">
      <div v-for="r in recipes" :key="r.id" class="recipe-item">
        <RecipePreview :recipe="r" @toggle-favorite="handleToggleFavorite" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview, mockGetRandomRecipesPreview } from "../services/recipes.js";
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
    }
  },
  data() {
    return {
      recipesInternal: this.recipes // Use internal data property for recipes
    };
  },
  mounted() {
    
      this.updateRecipes(this.numResults);
    
  },
  methods: {
    async updateRecipes(amountToFetch = 3) {
      try {
        const response = mockGetRecipesPreview(amountToFetch);
        const recipes = response.data.recipes;
        this.recipesInternal = recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async updateRandomRecipes(amountToFetch = 3) {
      try {
        const response = mockGetRandomRecipesPreview(amountToFetch);
        const recipes = response.data.recipes;
        this.recipesInternal = recipes;
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
