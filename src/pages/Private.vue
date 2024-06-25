<template>
  <div class="private-page">
    <div class="recipes-container">
      <RecipePreviewList ref="randomRecipesList" title="MY RECIPES" class="RandomRecipes" />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
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
  color: #000;
}

.content {
  margin-top: 20px;
  text-align: center;
}

</style>
