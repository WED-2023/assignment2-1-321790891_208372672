<template>
  <div class="private-page">
    <div class="recipes-container">
      <div class="content">
        <RecipePreviewList 
          ref="recipeList"
          title="MY RECIPES"
          class="RandomRecipes"
          :Private = "true"
          :titleStyle="customTitleStyle"
          :recipes="userRecipes"
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
      customTitleStyle: {
        fontSize: '40px',
        marginBottom: '20px'
      },
      userRecipes: [] // Store the fetched user recipes here
    };
  },
  async mounted() {
    try {
      // Fetch user recipes when the component is mounted
      const recipes = await getUserRecipes();
      this.userRecipes = recipes; // Set the fetched recipes to the userRecipes data property
    } catch (error) {
      console.error('Failed to load user recipes:', error.message);
      // Handle error (e.g., show a message to the user)
    }
  }
};
</script>

<style scoped>
.private-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipes-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.content {
  margin-top: 20px;
  text-align: center;
}
</style>
