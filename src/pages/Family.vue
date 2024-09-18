<template>
  <div  class="background">
    <div class="container">
      <h2 class="container-title">
          MY FAMILY RECIPES
      </h2>
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
.background{
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/main.jpg');
  background-position: center;
}

.container {
  background: rgba(255, 255, 255, 0.9); 
  padding: 80px;
  display: flex;
  justify-content: center; ;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  max-width: 900px; 
  width: 100%; 
  min-height: 100vh;
  box-sizing: border-box;
  position: relative; 
}

.container::before {
  content: '';
  position: absolute;
  top: 20px; /* Adjust this value to control distance from the top */
  left: 20px; /* Adjust this value to control distance from the left */
  right: 20px; /* Adjust this value to control distance from the right */
  bottom: 20px; /* Adjust this value to control distance from the bottom */
  border: 4px solid #f3c562; /* Orange border */
  pointer-events: none; /* Ensures it does not interfere with content */
  z-index: 0; /* Keeps it behind the title */

  /* Clip out the portion behind the title */
  clip-path: polygon(0 0, 30% 0, 30% 45px, 70% 45px, 70% 0, 100% 0, 100% 100%, 0 100%);
}

.container-title{
  font-size: 26px;
  color: #e97f29; /* Orange color for the title */
  position: absolute; /* Absolute positioning to move it in line with the top border */
  top: 10px; /* Adjust this value to move the title higher, closer to the top */
  left: 50%; /* Center the title horizontally */
  transform: translateX(-50%); /* Adjusts centering considering absolute position */
  padding: 0 20px; /* Adds padding to the background around the text */
  z-index: 10; /* Ensure the title is layered above the border */
  font-weight: bold;
  letter-spacing: 3px; /* Add spacing between letters */
}

.FamilyRecipes {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
</style>
