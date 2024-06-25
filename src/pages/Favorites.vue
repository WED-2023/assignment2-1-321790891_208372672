
<template>
  <div class="background">
    <div class="container">
      <div class="content">
        <RecipePreviewList
          ref="favoriteRecipesList"
          :recipes="favoriteRecipes"
          title="MY FAVORITE RECIPES"
          class="FavoritesRecipes"
          :loadFavorites = "true"
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
      numFavorites: 0 // Initialize numFavorites
    };
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
  height: 100%;
  color: #000;
}

.content {
  margin-top: 20px;
  text-align: center;
}


</style>
