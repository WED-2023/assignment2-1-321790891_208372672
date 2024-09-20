<template>
  <div class="background">
    <div class="container">
      <h2 class="container-title">
        MY FAVORITE RECIPES
      </h2>
      <div class="content">
        <RecipePreviewList
          ref="favoriteRecipesList"
          :recipes="favoriteRecipes"
          title="MY FAVORITE RECIPES"
          class="FavoritesRecipes"
          :loadFavorites = "true"
          :titleStyle="customTitleStyle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: 'Favorites',
  components: {
    RecipePreviewList
  },
  data() {
    return {
      favoriteRecipes: [], // Initialize with an empty array
      numFavorites: 0 ,// Initialize numFavorites
      customTitleStyle: {
        fontSize: '40px',
        marginBottom: '20px',
        display: 'none'
      }
    };
  }
};
</script>

<style scoped>
.background{
  background-size: contain;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/pizza.jpg');
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
  clip-path: polygon(0 0, 27% 0, 27% 45px, 73% 45px, 73% 0, 100% 0, 100% 100%, 0 100%);
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
