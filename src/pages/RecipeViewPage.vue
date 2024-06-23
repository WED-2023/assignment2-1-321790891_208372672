<template>
  <div class="container">
    <div v-if="recipe" class="recipe-container">
      <div class="left-section">
        <div class="recipe-header">
          <h1>{{ recipe.title }}</h1>
        </div>
        <hr class="separator" />
        <div class="recipe-info">
          <p><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</p>
          <p><strong>Likes:</strong> {{ recipe.aggregateLikes }} likes</p>
        </div>
      </div>
      <div class="right-section">
        <img :src="recipe.image" class="recipe-image" />
        <div class="recipe-body">
          <div class="recipe-ingredients">
            <h3>Ingredients:</h3>
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="recipe-instructions">
            <h3>Instructions:</h3>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        // response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
        //   {
        //     withCredentials: true
        //   }
        // );

        response = mockGetRecipeFullDetails(this.$route.params.recipeId);

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.recipe-container {
  display: flex;
  width: 100%;
  max-width: 100%;
  padding: 20px;
  gap: 20px;
}

.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
}

.recipe-header {
  text-align: left;

}

.recipe-header h1 {
  font-size: 2.5em;
  color: #333;
}

.separator {
  border: 0;
  border-top: 2px solid #e0e0e0;
  margin: 10px 0;
  margin-bottom: 40px;
}

.recipe-info {
  color: #555;
}

.right-section {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe-image {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.recipe-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.recipe-ingredients,
.recipe-instructions {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  color: #333;
  width: 100%;
}

.recipe-ingredients h3,
.recipe-instructions h3 {
  margin-top: 0;
}

.recipe-ingredients ul,
.recipe-instructions ol {
  padding-left: 20px;
}

.recipe-ingredients li,
.recipe-instructions li {
  margin-bottom: 10px;
  line-height: 1.5;
}
</style>