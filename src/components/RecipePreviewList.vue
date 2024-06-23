<template>
  <div class="recipe-preview-list">
    <h3 class="list-title">{{ title }}:</h3>
    <div class="recipes">
      <div v-for="r in recipes" :key="r.id" class="recipe-item">
        <RecipePreview :recipe="r" @toggle-favorite="handleToggleFavorite" />
      </div>
    </div>
  </div>
</template>


<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview, mockGetRandomRecipesPreview } from "../services/recipes.js";
import { mockAddFavorite } from "../services/user.js";


export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    numResults: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes(this.numResults);
  },
  methods: {
    async updateRecipes(amountToFetch = 3) {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

       // const amountToFetch = 3; // Set this to how many recipes you want to fetch
        const response = mockGetRecipesPreview(amountToFetch);
        //const response = mockGetRandomRecipesPreview(amountToFetch)

        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async updateRandomRecipes(amountToFetch = 3) {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        const amountToFetch = 3; // Set this to how many recipes you want to fetch
        //const response = mockGetRecipesPreview(amountToFetch);
        const response = mockGetRandomRecipesPreview(amountToFetch)

        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async handleToggleFavorite(recipeId, isFavorite) {
      try {
        // Call addFavorite function
        const response = await mockAddFavorite(recipeId);
        console.log(response.data.message);
        // Handle state update or other actions as needed
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe-preview-list {
  margin-bottom: 20px;
  
}

.list-title {
  margin-bottom: 10px;
  margin-left: 10px;
}

.recipes {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust gap as needed */
}

.recipe-item {
  /* Additional styling if needed */
}
</style>