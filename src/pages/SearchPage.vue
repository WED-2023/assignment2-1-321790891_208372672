
<template>
  <div class="search-page">
    <div class="background-photo">
      <!-- Your background photo -->
    </div>
    <div class="search-container">
      <div class="search-icon">
      </div>
      <b-form @submit.prevent="onSearch" class="search-form">
        <img src="../assets/logo.png" alt="Icon" class="icon">
        <div class="search-bar">
          
          <b-form-input
            v-model="searchQuery"
            type="text"
            placeholder="Search for recipes..."
            class="search-input"
          ></b-form-input>
        
          <div class="filter-container">
            <b-form-select
              v-model="numResults"
              :options="resultOptions"
              class="num-results-select"
            ></b-form-select>
            <b-button @click="toggleFilter" class="filter-button">Filter</b-button>
          </div>
        </div>
        <b-button class="search-button" type="submit">Search</b-button>
      </b-form>
      <div v-if="showFilter" class="filter-panel">
        <div class="filter-category">
          <h5>Cuisine</h5>
          <b-button-group class="mb-2">
            <b-button v-for="cuisine in cuisines" :key="cuisine"  @click="toggleFilterOption('cuisine', cuisine)">
              {{ cuisine }}
            </b-button>
          </b-button-group>
        </div>
        <div class="filter-category">
          <h5>Diet</h5>
          <b-button-group class="mb-2">
            <b-button v-for="diet in diets" :key="diet"  @click="toggleFilterOption('diet', diet)">
              {{ diet }}
            </b-button>
          </b-button-group>
        </div>
        <div class="filter-category">
          <h5>Intolerance</h5>
          <b-button-group class="mb-2">
            <b-button v-for="intolerance in intolerances" :key="intolerance" @click="toggleFilterOption('intolerance', intolerance)">
              {{ intolerance }}
            </b-button>
          </b-button-group>
        </div>
      </div>
      <div class="search-results">
        <!-- Search results will be rendered here -->
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchQuery: '',
      numResults: 5,
      resultOptions: [5, 10, 15],
      showFilter: false,
      cuisines: ['Italian', 'Thai', 'French', 'Greek', 'Chinese', 'Mexican', 'German', 'Indian', 'Japanese'],
      diets: ['Vegetarian', 'Vegan'],
      intolerances: ['Gluten', 'Dairy', 'Peanut', 'Seafood', 'Soy'],
      selectedFilters: {
        cuisine: [],
        diet: [],
        intolerance: []
      }
    };
  },
  methods: {
    onSearch() {
      // Handle the search logic
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    toggleFilterOption(type, option) {
      const index = this.selectedFilters[type].indexOf(option);
      if (index > -1) {
        this.selectedFilters[type].splice(index, 1);
      } else {
        this.selectedFilters[type].push(option);
      }
    }
  }
};
</script>
<style scoped>
/* Existing styles */
.search-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.search-page {
  position: relative;
}
.filter-category .mb-2 .btn:focus,
.filter-category .mb-2 .btn:active {
  outline: none;
  color: white;
  background-color: #eb7037;
}
.background-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/searchCover.jpg');
  background-size: cover;
  z-index: -1; /* Ensure it's behind other content */
}

.icon {
  position: absolute center;
  margin-bottom: 5%;
  margin-left: 50%;
  top: 10%; /* Adjust the top position as needed */
  right: 50%; 
  transform: translateX(-50%); /* Adjust horizontally centered position */
  width: 150px; /* Change the width to your desired size */
  height: 150px; /* Change the height to your desired size */
  z-index: 1; /* Ensure it's above other content */
}

.search-container {
  width: 100%;
  max-width: 650px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
  font-size: 1.2em; /* Increase font size */
  padding: 10px; /* Increase padding */
}

.filter-container {
  display: flex;
  align-items: center;
}

.num-results-select {
  width: 60px; /* Smaller width */
  margin-right: 10px;
}

.filter-button {
  border-color: black;
  background-color: black;
  white-space: nowrap;
  color:white
  
}

.search-button {
  border-color: black;
  display: block;
  width: 100%;
  color: white;
  margin-top: 10px; /* Add margin top */
  font-size: 1.2em; /* Increase font size */
  background-color: black;
}

.filter-panel {
  margin-top: 20px;
}

.filter-category {
  margin-bottom: 20px;
}

.filter-category .mb-2 .btn {
  margin-right: 10px; /* Add space between buttons */
  margin-bottom: 5px; /* Optional: Add space below buttons for better wrapping */
  color: orange;
  background-color: rgb(240, 236, 236);
  border-color: black;
}

.filter-category .mb-2 .btn:hover {
  color: white;
  background-color: orange;
}
.filter-category .mb-2 .btn::selection{
  color: aqua;
}

.filter-category h5 {
  color: #ffffff; /* Change the color to your desired color */
}
.filter-category .mb-2 .btn:last-child {
  margin-right: 0; /* Remove the margin from the last button */
}


</style>