<template>
  <div class="container">
    <h1 class="title">MY FAMILY RECIPES:</h1>
    <div class="FamilyRecipes">
      <RecipePreview
        v-for="(recipe, index) in familyRecipes"
        :key="index"
        :recipe="recipe"
        :isFamilyRecipe="true"
        @click.native="goToRecipe(recipe.id)"
      />
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import { mockGetFamilyRecipesPreview } from "../services/recipes";

export default {
  name: "FamilyRecipesPage",
  components: {
    RecipePreview
  },
  data() {
    return {
      familyRecipes: []
    };
  },
  created() {
    this.fetchFamilyRecipes();
  },
  methods: {
    fetchFamilyRecipes() {
      const { data } = mockGetFamilyRecipesPreview(3); // Fetch 10 family recipes as an example
      this.familyRecipes = data.recipes;
    },
    goToRecipe(recipeId) {
      console.log('Navigating to recipe with ID:', recipeId);
      this.$router.push({ name: 'RecipeFullView', params: { recipeId } });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.FamilyRecipes {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
</style>
