<template>
  <div class="background">
  <div class="login-container">
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

       
        <b-button type="submit" variant="primary" class="btn-login">Sign In</b-button>
        <router-link to="forgot-password" class="forgot-password">Forgot Password?</router-link>
      </b-form>

      <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
        Login failed: {{ form.submitError }}
      </b-alert>
    </div>
    <div class="login-welcome">
      <h2>Welcome to login</h2>
      <p>Don't have an account?</p>
      <router-link to="register" class="btn-signup">Sign Up</router-link>
    </div>
  </div>
</div>
</template>


<script>
import { required } from "vuelidate/lib/validators";
import {mockLogin} from "../services/auth.js"
export default {
  name: "Login",
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
<style lang="scss" scoped>
html, body {
  height: 100%;
  margin: 0;
}
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/login.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
}

.login-container {
  display: flex;
  max-width: 1000px;
  height: 75%;
  width: 85%; // Ensure the container doesn't exceed the viewport width
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.login-form, .login-welcome {
  flex: 1;
  padding: 2rem;
}

.login-form {
  background: rgba(255, 255, 255, 0.9); // White background with some transparency
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  margin-bottom: 1.5rem;
  text-align: center;
}

.btn-login {
  width: 100%;
  background: linear-gradient(to right, #e97f29, #e97f29);
  border: none;
  margin-top: 1rem;
}

.forgot-password {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #e97f29;
}

.login-welcome {
  background: linear-gradient(to right, #e97f29, #e97f29);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.login-welcome h2 {
  margin-bottom: 1rem;
}

.btn-signup {
  background-color: white;
  color: #e97f29;
  border: none;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.btn-signup:hover {
  background-color: #e97f29;
  color: white;
}
</style>
