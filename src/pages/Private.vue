<template>
  <div>
    <h1>My Recipes</h1>
    <div v-if="recipes.length === 0">
      <p>No recipes found.</p>
    </div>
    <div v-else>
      <RecipePreview
        v-for="(recipe, index) in recipes"
        :key="index"
        :recipe="recipe"
      />
    </div>
  </div>
</template>

<script>
import { getRecipes } from "@/services/recipe";
import RecipePreview from "@/components/RecipePreview";

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: []
    };
  },
  async created() {
    this.recipes = await getRecipes();
  }
};
</script>

<style scoped>
/* Add any additional styling as needed */
</style>
