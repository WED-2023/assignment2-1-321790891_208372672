<template>
  <div class="container">
    <div class="content">
      <RecipePreviewList
        ref="favoriteRecipesList"
        title="MY FAVORITE RECIPES"
        class="FavoritesRecipes"
      />
      <button @click="loadMoreFavoriteRecipes" class="load-more-button">
        Load More
      </button>
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
  methods: {
    loadMoreFavoriteRecipes() {
      const currentAmount = this.$refs.favoriteRecipesList.recipes.length; // Get current amount of recipes
      const amountToFetch = currentAmount + 3; // Calculate new amount to fetch
      this.$refs.favoriteRecipesList.updateRecipes(amountToFetch); // Call updateRecipes with the new amount
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Ensures container takes full height of viewport */
}

.content {
  margin-top: 20px;
  text-align: center; /* Center aligns child elements */
}

.load-more-button {
  border: 2px solid #e97f29;
  background-color: white;
  color: #e97f29;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 4px;
}

.load-more-button:hover {
  background-color: #e97f29;
  color: white;
}

</style>