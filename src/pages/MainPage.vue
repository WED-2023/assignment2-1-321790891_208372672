
<template>
  <div class="background-container">
    <div class="container">
      <div class="left-column">
        <div>
          <RecipePreviewList
            ref="randomRecipesList"
            title="Explore Recipes"
            class="RandomRecipes"
          />
        </div>
        <button @click="loadNewRandomRecipes" class="load-more-button">
          Load More
        </button>
      </div>
      <div class="right-column">
        
        <span v-if="!$root.store.username" class="sign-in-form">
          <h2 class="form-title">Sign In</h2>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="username" id="username" v-model="username" placeholder="Enter Username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" placeholder="Enter Password">
          </div>
          <button @click="submitForm" class="submit-button">Sign In</button>
        </span>

        <span v-else class="last-viewed">
          <RecipePreviewList
          title="Last Viewed Recipes"
          class="LastViewedRecipes"
          :disabled="!$root.store.username"
        />
        </span>

      </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    loadNewRandomRecipes() {
      this.$refs.randomRecipesList.updateRecipes();
    },
    submitForm() {
      // Logic to submit the form
    }
  }
};
</script>

<!-- <style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style> -->
<style lang="scss" scoped>
// .background-container {
//   background-image: url('../assets/recipes.jpg');
//   background-size: cover; /* Ensures the image covers the entire background */
//   background-position: center; /* Centers the image */
//   background-repeat: no-repeat; /* Ensures the image does not repeat */
//   height: 100%; /* Adjusts height to cover the viewport */
//   width: 100%; /* Adjusts width to cover the viewport */
// }


.container {
  display: flex;
  justify-content: space-between;
}

.left-column {
  margin-top: 40px;
  margin-left: -50px; /* Adjust this value to move left column more to the left */
}

.right-column {
  margin-top: 40px;
  margin-right: -50px; /* Adjust this value to move left column more to the left */
  flex-basis: 40%; /* Adjusted to 30% */
}

.section-title {
  margin-bottom: 10px;
}

.RandomRecipes,
.LastViewedRecipes {
  margin-bottom: 10px;
}

.load-more-button {
  width: 20%;
  padding: 10px;
  cursor: pointer;
  background-color: #e97f29;
  color: white;
  border: #e97f29;
  border-radius: 4px;
  margin-left: 40%;
  margin-bottom: 20px;
}

.load-more-button:hover {
  transform: scale(1.05); /* Increase size on hover */
}

.sign-in-form {
  /* Styles for sign-in form */
}

.form-title {
  margin-bottom: 40px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
}

input[type="username"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  transform: scale(1.05); /* Increase size on hover */
}
</style>