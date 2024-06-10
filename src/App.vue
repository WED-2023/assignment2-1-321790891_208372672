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
        <span v-if="!$root.store.username" class="guest-container">
          Hello Guest!  
          <router-link :to="{ name: 'register' }">Register</router-link>|
          <router-link :to="{ name: 'login' }">Login</router-link>|
        </span>
        <span v-else>
          {{ $root.store.username }}: <button @click="Logout">Logout</button>|
        </span>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
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
  padding: 10px 40px; /* Adjusted padding for a more compact look */
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between items */
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
  margin-right: 5px;
  transition: transform 0.3s ease; /* Smooth transition for hover effect */
}

.nav-icon:hover {
  transform: scale(1.2); /* Increase size on hover */
}

.site-name {
  font-family: 'Georgia', serif; /* Different font for the site name */
  font-size: 24px;
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
}

#nav a.router-link-exact-active, #nav a:active {
  color: #d16c3d; /* Active link color */
}

#nav a:hover {
  color: #d16c3d; /* Hover color */
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

.guest-container {
  margin-right: 40px; /* Adjust the margin as per your preference */
}

</style>
