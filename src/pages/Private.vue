<template>
  <div class="private-page">
    <div class="recipes-container">
      <div class="content">
        <RecipePreviewList 
        ref="randomRecipesList" 
        title="MY RECIPES" 
        class="RandomRecipes" 
        :titleStyle="customTitleStyle"
        />
      </div>
      
    </div>
  </div>
</template>

<script>
import { Button } from "bootstrap";
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      customTitleStyle: {
        fontSize: '40px',
        marginBottom: '20px'
      }
    };
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
