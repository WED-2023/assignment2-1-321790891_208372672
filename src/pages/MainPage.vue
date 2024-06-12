
<template>
  <div class="container">
    <div class="left-column">
      <RecipePreviewList
        title="Explore Recipes"
        class="RandomRecipes"
      />
      <button @click="loadNewRandomRecipes" class="load-more-button">
        Load More
      </button>
    </div>
    <div class="right-column">
      
      <span v-if="!$root.store.username" class="sign-in-form">
        <h2 class="form-title">Sign In</h2>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" id="email" v-model="email" placeholder="Enter Email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter Password">
        </div>
        <div class="form-group">
          <input type="checkbox" id="remember-me">
          <label for="remember-me">Remember me</label>
        </div>
        <button @click="submitForm" class="submit-button">Submit</button>
      </span>

      <span v-else>
        <h2 class="section-title">Last Viewed Recipes</h2>
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
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    loadNewRandomRecipes() {
      // Logic to load new random recipes
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
.container {
  display: flex;
  justify-content: space-between;
}

.left-column {
  flex-basis: 20%; /* Adjust as needed */
}

.right-column {
  flex-basis: 20%; /* Adjust as needed */
}

.section-title {
  margin-bottom: 10px;
}

.RandomRecipes,
.LastViewedRecipes {
  margin-bottom: 20px;
}

.load-more-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.sign-in-form {
  /* Styles for sign-in form */
}

.form-title {
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
}

input[type="email"],
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
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>