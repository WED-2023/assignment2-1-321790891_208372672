<template>
  <div class="private-page">
    <div class="recipes-container">
      <h2 class="container-title">
        MY RECIPES
      </h2>
      <div v-if="this.isEmpty" class="no-recipes">
        <h3>You haven't whipped up any of your own recipes yet! Time to get creative and cook up something amazing!</h3>
      </div>
      <div class="content">
        <RecipePreviewList 
          ref="recipeList"
          class="RandomRecipes"
          :titleStyle="customTitleStyle"
          :recipes="userRecipes"
          :PrivateRecipe="true"
          @click.native="goToRecipe(recipe.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { getUserRecipes } from "../services/user.js";

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      isEmpty: false,
      userRecipes: [] // Store the fetched user recipes here
    };
  },
  async mounted() {
    try {
      // Fetch user recipes when the component is mounted
      const recipes = await getUserRecipes();
      if(recipes.length == 0){
        this.isEmpty = true;
      }
      else{
          this.isEmpty = false;
      }
      this.userRecipes = recipes; // Set the fetched recipes to the userRecipes data property
    } catch (error) {
      console.error('Failed to load user recipes:', error.message);
      // Handle error (e.g., show a message to the user)
    }
  },
  methods:{
    goToRecipe(recipeId) {
      console.log('Navigating to private recipe with ID:', recipeId);
      this.$router.push({ name: 'PrivateRecipeFullView', params: { recipeId } });
    }
  }
};
</script>

<style scoped>
.no-recipes{
  color:black;
  margin-left: 10px;
  text-align: center; /* Align text to center */
  padding: 50px;
}
.no-recipes h3{
  font-size: 20px;
  line-height: 1.6;     /* Line spacing between text lines */
}

.private-page {
  background-size: contain;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/private.jpg');
  background-position: center;
}

.recipes-container {
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

.recipes-container::before {
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
  clip-path: polygon(0 0, 37% 0, 37% 45px, 63% 45px, 63% 0, 100% 0, 100% 100%, 0 100%);
}

.container-title{
  font-size: 26px;
  color: #e97f29; /* Orange color for the title */
  position: absolute; /* Absolute positioning to move it in line with the top border */
  top: 10px; /* Adjust this value to move the title higher, closer to the top */
  left: 50%; /* Center the title horizontally */
  transform: translateX(-50%); /* Adjusts centering considering absolute position */
  padding: 0 20px; /* Adds padding to the background around the text */
  z-index: 0; /* Keeps it behind the title */
  font-weight: bold;
  letter-spacing: 3px; /* Add spacing between letters */
}

.content {
  margin-top: 20px;
  text-align: center;
}
</style>
