<template>
  <div class="background-container">
    <div class="container">
      <div class="left-column">
        <div>
          <RecipePreviewList
            ref="randomRecipesList"
            title="EXPLORE RECIPES"
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

        <div v-else class="last-viewed">
          <RecipePreviewList
            ref="lastViewedRecipesList"
            title="LAST VIEWED RECIPES"
            class="LastViewedRecipes"
            :disabled="!$root.store.username"
            :loadLastViewed="true" 
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
.container {
  display: flex;
}

.left-column {
  flex: 1; 
  margin-right: 20px; 
  margin-top: 40px;
  margin-left: -60px; 
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.right-column {
  flex: 1; 
  margin-top: 40px;
  margin-right: -30px; 
  flex-direction: column;
}

.last-viewed{
  margin-left: 70px; 
}

.login-form {
  margin-left: 100px; 
  background: rgba(255, 255, 255, 0.9); // White background with some transparency
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  margin-bottom: 1.5rem;
  text-align: center;
}

.sigh-in-button {
  border: 2px solid #e97f29;
  background-color: #e97f29;
  color: white;

  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 4px;
  width: 100%;
  margin-top: 1rem;
}


.sigh-in-button:hover {
  background-color: white;
  color: #e97f29;
  border: 2px solid #e97f29;
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
.LastViewedRecipes {
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
  margin-bottom: 20px;
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