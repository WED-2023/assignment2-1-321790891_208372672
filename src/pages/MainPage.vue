<template>
  <div class="background-container">
    <div :class="['container', { 'center-content': !$root.store.username }]">
      <h2 class="container-title">
        WELCOME TO <span class="foxchef-font">FOXCHEF CUISINE</span>
      </h2>
      <div class="left-column">
        <h3>
          EXPLORE RECIPES
        </h3>
        <div>
          <RecipePreviewList
            ref="randomRecipesList"
            class="RandomRecipes"
            :mainPage = "true"
          />
          <button @click="loadNewRandomRecipes" class="load-more-button">
            Load More
          </button>
        </div>
      </div>
      <div class="right-column">
        <div v-if="!$root.store.username" class="sign-in-form">
          <div class="login-form">
            <b-form @submit.prevent="onLogin">
              <h1 class="title">Sign In</h1>
              <b-form-group id="input-group-Username" label="Username:" label-for="Username">
                <b-form-input
                  id="Username"
                  v-model="$v.form.username.$model"
                  type="text"
                  :state="validateState('username')"
                ></b-form-input>
                <b-form-invalid-feedback>Username is required</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-Password" label="Password:" label-for="Password">
                <b-form-input
                  id="Password"
                  type="password"
                  v-model="$v.form.password.$model"
                  :state="validateState('password')"
                ></b-form-input>
                <b-form-invalid-feedback>Password is required</b-form-invalid-feedback>
              </b-form-group>

              <b-button type="submit" variant="primary" class="sign-in-button">Sign In</b-button>
              <router-link to="forgot-password" class="forgot-password">Forgot Password?</router-link>
            </b-form>

            <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
              Login failed: {{ form.submitError }}
            </b-alert>
          </div>
        </div>

        <div v-else class="favorite-recipes">
          <h3>
          MY FAVORITE RECIPES
          </h3>
          <RecipePreviewList
            ref="favoriteRecipesList"
            class="FavoriteRecipes"
            :disabled="!$root.store.username"
            :loadFavoritesMain="true" 
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { required } from "vuelidate/lib/validators";
import { Login } from "../services/auth.js";

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    loadNewRandomRecipes() {
      // Calls the method in RecipePreviewList to fetch new random recipes
      this.$refs.randomRecipesList.updateRandomRecipes();
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await Login(this.form.username, this.form.password);

        // If login is successful, proceed to update the state and navigate
        console.log("Login successful:", response);
        this.$root.store.login(this.form.username); // Update the app's state for logged in user
        this.$router.push("/"); // Redirect to the main page
      } catch (err) {
        console.error("Login failed:", err);
        this.form.submitError = err.message || "Login failed. Please try again.";
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>

<style lang="scss" scoped>
h3{
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}
.background-container{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/main.jpg');
  background-size: cover;
  background-position: center;
}

.container {
  background: rgba(255, 255, 255, 0.9); // White background with some transparency
  padding: 80px;
  display: flex;
  justify-content: center; // Horizontally center content
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  max-width: 1200px; // Limit the maximum width to avoid overflow
  width: 100%; // Allow the container to take up the full available width
  min-height: 100vh;
  box-sizing: border-box; // Ensure padding and border are included in width/height calculations
  position: relative; /* Required for inset shadow */
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
  clip-path: polygon(0 0, 25% 0, 25% 45px, 75% 45px, 75% 0, 100% 0, 100% 100%, 0 100%);
}

.container-title{
  font-size: 26px;
  color: #e97f29; /* Orange color for the title */
  position: absolute; /* Absolute positioning to move it in line with the top border */
  top: 10px; /* Adjust this value to move the title higher, closer to the top */
  left: 50%; /* Center the title horizontally */
  transform: translateX(-50%); /* Adjusts centering considering absolute position */
  padding: 0 20px; /* Adds padding to the background around the text */
  z-index: 10; /* Ensure the title is layered above the border */
  font-weight: bold;
  letter-spacing: 3px; /* Add spacing between letters */
}

.foxchef-font {
  font-family: 'Lucida Handwriting', cursive; /* Different font for the site name */
}


.left-column .right-column {
  flex: 0.5; 
  margin-right: 5px; 
}


.center-content {
  align-items: center; /* Center the login form vertically */
}


.login-form {
  display: flex;
  margin: 20 auto; // Center the login form when it's displayed
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px; // Ensure login form doesn’t get too wide
  box-sizing: border-box;
  margin-left: 50px;
}

.title {
  margin-bottom: 1.5rem;
  text-align: center;
}

.sign-in-button {
  width: 100%;
  background: linear-gradient(to right, #e97f29, #e97f29);
  border: none;
  margin-top: 1rem;
  outline: none; /* Remove default outline */
  box-shadow: none; /* Ensure no shadow when clicked */
  transition: background-color 0.3s, box-shadow 0.3s; /* Add transition effects */
  border: 2px solid #e97f29;
}


.sign-in-button:hover {
  width: 100%;
  background: linear-gradient(to right, white, white);
  border: none;
  margin-top: 1rem;
  // background-color: white;
  color: #e97f29;
  border: 2px solid #e97f29;
  outline: none; /* Remove default outline */
  box-shadow: none; /* Ensure no shadow when clicked */
}


.forgot-password {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #e97f29;
}

.section-title {
  margin-bottom: 10px;
}

.RandomRecipes,
.FavoriteRecipes {
  margin-bottom: 10px;
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
  margin-top: 5px; 
  margin-left: 37%;
}

.load-more-button:hover {
  background-color: #e97f29;
  color: white;
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

</style>