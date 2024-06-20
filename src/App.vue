<template>
  <div id="app">
    <div id="nav">
      <div class="left-container">
        <div class="icon-container">
          <img src="@/assets/logo.png" alt="Icon" class="nav-icon" />
          <div class="site-name">FOXCHEF CUISINE</div>
        </div>
        <div class="links-container">
          <router-link :to="{ name: 'main' }">Recipes</router-link>|
          <router-link :to="{ name: 'search' }">Search</router-link>|
          <router-link :to="{ name: 'about' }">About</router-link>|
        </div>
      </div>
      <div class="right-container">
        <span v-if="!$root.store.username">
          Hello Guest!  
          <router-link :to="{ name: 'register' }" >Register</router-link>|
          <router-link :to="{ name: 'login' }">Login</router-link>|
        </span>
        <span v-else>
          Hello, {{ $root.store.username }}!
          <div class="dropdown">
            <button class="dropbtn">Personal &#9662;</button> <!-- Unicode character for down arrow -->
            <div class="dropdown-content">
              <router-link :to="{ name: 'favorites' }">My Favorite Recipes</router-link>
              <router-link :to="{ name: 'private' }">My Recipes</router-link>
              <router-link :to="{ name: 'family' }">My Family Recipes</router-link>
            </div>
          </div>|
          <RecipeModal :show="showRecipeModal" @close="showRecipeModal = false" />
        <button class="nav-link btn btn-link" @click="showRecipeModal = true">
          Create New Recipe
        </button>
          <button class="logout" @click="Logout">Logout</button>|
        </span>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import RecipeModal from './components/RecipeModal.vue';
export default {
  name: "App",
  components: {
    RecipeModal
  },
  data() {
    return {
      showRecipeModal: false
    }
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    openModal() {
    this.$refs.recipeModal.modalOpen = true; // Ensure you have a ref="recipeModal" in RecipeModal.vue
  }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #8f98a0;
  min-height: 100vh;
}

#nav {
  background-color: #000000; /* Black background */
  padding: 10px 10px; /* Adjusted padding for a more compact look */
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between items */
  font-size: 15px;
}

.left-container {
  display: flex;
  align-items: center;
}

.icon-container {
  display: flex;
  align-items: center;
}

.nav-icon {
  width: 50px; /* Adjust size as needed */
  height: 50px; /* Adjust size as needed */
  //margin-right: 5px;
  transition: transform 0.3s ease; /* Smooth transition for hover effect */
}

.nav-icon:hover {
  transform: scale(1.2); /* Increase size on hover */
}

.site-name {
  font-family: 'Georgia', serif; /* Different font for the site name */
  font-size: 20px;
  color: #d16c3d; /* Orange color */
  margin-left: 5px; /* Closer to the logo */
}

.links-container {
  display: flex;
  align-items: center;
  margin-left: 30px; /* Further away from the site name */
}

#nav a {
  font-weight: bold;
  color: #ffffff; /* White color for links */
  margin-right: 15px; /* Spacing between links */
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px; /* Add border radius for smooth effect */
  transition: color 0.3s ease; /* Smooth transition for color change */
}

#nav a.router-link-exact-active, #nav a:active {
  color: #d16c3d; /* Active link color */
}

#nav a:hover {
  color: #d16c3d; /* Hover color */
  
}

#nav .logout {
  background-color: transparent; /* Set background color to transparent */
  font-weight: bold;
  font-size: 15px;
  color: #ffffff; /* White color for links */
  margin-right: 15px; /* Spacing between links */
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px; /* Add border radius for smooth effect */
  transition: color 0.3s ease; /* Smooth transition for color change */
}

#nav .logout:hover {
  color: #d16c3d; /* Change text color on hover */
}

#nav .logout:active{
  background-color: transparent; /* Set background color to transparent */
}

#nav .dropdown .dropbtn,
#nav button {
  font-size: 15px;
  background-color: transparent; /* Remove background color */
  font-weight: bold;
  color: #ffffff; /* White color for links */
  margin-right: 15px; /* Spacing between links */
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px; /* Add border radius for smooth effect */
  transition: color 0.3s ease; /* Smooth transition for color change */
}

#nav .dropdown .dropbtn:hover,
#nav button:hover {
  color: #d16c3d; /* Change text color on hover */
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  font-weight: bold;
  //color: #d16c3d; /* Orange text color */
  margin-right: 15px; /* Spacing between links */
  text-decoration: none;
  padding: 5px 10px;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease; /* Smooth transition for color change */
}

.dropbtn:hover {
  color: #d16c3d; /* Hover color */
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: black;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}

.dropdown-content a:hover {
  background-color: transparent;
  color: #000; /* Change text color on hover */
}

/* Additional styles to explicitly set text color for dropdown options */
.dropdown-content a.router-link-exact-active,
.dropdown-content a:active {
  color: black; /* Set text color to black */
}

.dropdown:hover .dropdown-content {
  display: block;
}


.right-container {
  display: flex;
  align-items: center;
}

#nav span {
  display: flex;
  align-items: center;
}

#nav button {
  background-color: #d16c3d; /* Orange logout button */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px 1px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}

#nav button:active {
  background-color: #d8642f; /* Darker orange when clicked */
}

#nav input[type="text"] {
  padding: 5px;
  font-size: 14px;
  margin-left: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

#nav input[type="submit"] {
  padding: 5px 10px;
  font-size: 14px;
  margin-left: 10px;
  border-radius: 4px;
  background-color: #d16c3d;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}

#nav input[type="submit"]:active {
  background-color: #d8642f; /* Darker orange when clicked */
}
</style>
