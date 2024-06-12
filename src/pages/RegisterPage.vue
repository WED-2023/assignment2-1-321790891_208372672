<template>
  <div class="background">
    <div class="container">
      <h1 class="title">Register</h1>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group
          id="input-group-username"
          label-cols-sm="4"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">
            Username is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.username.length">
            Username length should be between 3-8 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">
            Username should contain only alphabetic characters
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          id="input-group-firstName"
          label-cols-sm="4"
          label="First Name:"
          label-for="firstName"
        >
          <b-form-input
            id="firstName"
            v-model="$v.form.firstName.$model"
            type="text"
            :state="validateState('firstName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstName.required">
            First name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.firstName.length">
            First name length should be between 3-15 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
            First name should contain only alphabetic characters
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          id="input-group-lastName"
          label-cols-sm="4"
          label="Last Name:"
          label-for="lastName"
        >
          <b-form-input
            id="lastName"
            v-model="$v.form.lastName.$model"
            type="text"
            :state="validateState('lastName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastName.required">
            Last name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.lastName.length">
            Last name length should be between 3-15 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
            Last name should contain only alphabetic characters
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          id="input-group-country"
          label-cols-sm="4"
          label="Country:"
          label-for="country"
        >
          <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
          ></b-form-select>
          <b-form-invalid-feedback>
            Country is required
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          id="input-group-password"
          label-cols-sm="4"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">
            Password is required
          </b-form-invalid-feedback>
          <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
            Your password should be <strong>strong</strong>. <br />
            For that, your password should be also:
          </b-form-text>
          <b-form-invalid-feedback
            v-if="$v.form.password.required && !$v.form.password.length"
          >
            Have length between 5-10 characters long
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          id="input-group-confirmedPassword"
          label-cols-sm="4"
          label="Confirm Password:"
          label-for="confirmedPassword"
        >
          <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
            Password confirmation is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >
            The confirmed password is not equal to the original password
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          id="input-group-email"
          label-cols-sm="4"
          label="Email:"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="$v.form.email.$model"
            type="email"
            :state="validateState('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.email.emailFormat">
            Invalid email format
          </b-form-invalid-feedback>
        </b-form-group>
        
        <div class="button-container">
          <b-button type="reset" class="ml-5 w-75 custom-reset-button" style="width: 250px;">Reset</b-button>
          <b-button type="submit" class="ml-5 w-75 custom-register-button" style="width: 500px;">Register</b-button>
        </div>
        
        <div class="mt-2">
          You have an account already?
          <router-link to="login"> Log in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Register failed: {{ form.submitError }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
import { mockRegister } from "../services/auth.js";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        length: (f) => minLength(3)(f) && maxLength(15)(f),
        alpha
      },
      lastName: {
        required,
        length: (l) => minLength(3)(l) && maxLength(15)(l),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      },
      email: {
        required,
        emailFormat: (value) => /\S+@\S+\.\S+/.test(value), // Custom rule for email format
        maxLength: maxLength(40) // Maximum length of 40 characters
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const userDetails = {
          username: this.form.username,
          password: this.form.password
        };

        const response = mockRegister(userDetails);

        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      };
      this.$v.$reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.background {
  background-image: url('../assets/register1.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 85px;
}

.title {
  margin-bottom: 30px;
  margin-top: 10px;
}

.container {
  max-width: 900px;
  width: 700px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //margin-top: 10px;
  margin-bottom: 70px;
}

.button-container {
  flex-direction: column;
  position: relative;
  margin-top: 30px;
}

.mt-2{
  margin-left: 75px;
  margin-bottom: 10px;
}

.custom-reset-button {
  background-color: #e97f29;
  color: white;
  border: #e97f29;
}

.custom-register-button {
  background-color: rgb(10, 10, 10);
  color: white;
  margin-top: 10px;
}
</style>
