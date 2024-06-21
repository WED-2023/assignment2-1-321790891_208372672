
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
        <button @click="loadNewRandomRecipes" class="load-more-button">
          Load More
        </button>
      </div>
    </div>
      <div class="right-column">
        
        <div v-if="!$root.store.username" class="sign-in-form">
          <!-- <h2 class="form-title">Sign In</h2>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="username" id="username" v-model="username" placeholder="Enter Username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" placeholder="Enter Password">
          </div>
          <button @click="submitForm" class="submit-button">Sign In</button> -->
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

            
                <b-button type="submit" variant="primary" class="sigh-in-button">Sign In</b-button>
                <router-link to="forgot-password" class="forgot-password">Forgot Password?</router-link>
              </b-form>

              <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
                Login failed: {{ form.submitError }}
              </b-alert>
            </div>
          </div>

        <div v-else class="last-viewed">
          <RecipePreviewList
          title="Last Viewed Recipes"
          class="LastViewedRecipes"
          :disabled="!$root.store.username"
        />
        </div>

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
import { required } from "vuelidate/lib/validators";
import {mockLogin} from "../services/auth.js"
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
      this.$refs.randomRecipesList.updateRandomRecipes();
    },
    submitForm() {
      // Logic to submit the form
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        
        // const response = await this.axios.post(
        //   this.$root.store.server_domain +"/Login",


        //   {
        //     username: this.form.username,
        //     password: this.form.password
        //   }
        // );

        const success = true; // modify this to test the error handling
        const response = mockLogin(this.form.username, this.form.password, success);

        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
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
//   background-image: url('~@/assets/about-background.jpg'); /* Adjust the path based on your actual image location */
//   background-size: cover;
//   background-position: center;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 40px;
// }

.container {
  display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap; /* Allow items to wrap if needed */
}

.left-column {
  flex: 1; /* Allow left column to grow and take available space */
  margin-right: 20px; /* Adjust spacing between left and right columns */
  margin-top: 40px;
  margin-left: -60px; /* Adjust this value to move left column more to the left */
}

.right-column {
  flex: 1; /* Allow right column to grow and take available space */
  //margin-left: 170px; /* Adjust spacing between left and right columns */
  margin-top: 40px;
  margin-right: -40px; /* Adjust this value to move left column more to the left */
  //flex-basis: 40%; /* Adjusted to 30% */
}

.last-viewed{
  margin-left: 70px; /* Adjust spacing between left and right columns */
}

.login-form {
  margin-left: 100px; /* Adjust spacing between left and right columns */
  //padding: 2rem;
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
  width: 100%;
  background: linear-gradient(to right, #e97f29, #e97f29);
  border: none;
  margin-top: 1rem;
}


.sigh-in-button:hover {
  transform: scale(1.05); /* Increase size on hover */
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
  width: 20%;
  padding: 10px;
  cursor: pointer;
  background-color: #e97f29;
  color: white;
  border: #e97f29;
  border-radius: 4px;
  margin-left: 37.5%;
  margin-bottom: 20px;
}

.load-more-button:hover {
  transform: scale(1.05); /* Increase size on hover */
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

// .sigh-in-button {
//   width: 100%;
//   padding: 10px;
//   background-color: black;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-top: 20px;
// }




</style>