<template>
  <div class="search-page">
    <div class="background-photo">
      <!-- Your background photo -->
    </div>
    <div class="icon-container">
      <img src="../assets/logo.png" alt="Icon" class="icon" />
    </div>
    <div class="search-container">
      <div class="search-icon"></div>
      <b-form @submit.prevent="onSearch" class="search-form">
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
            <b-form-select
              v-model="sortOption"
              :options="sortOptions"
              class="sort-select"
            ></b-form-select>
            <b-button @click="toggleFilter" class="filter-button">
              Filter
            </b-button>
          </div>
        </div>
        <b-button class="search-button" type="submit">Search</b-button>
      </b-form>
      <div v-if="showFilter" class="filter-panel">
        <div class="filter-category">
          <h5>Cuisine</h5>
          <b-button-group class="mb-2">
            <b-button
              v-for="cuisine in cuisines"
              :key="cuisine"
              :class="{ selected: selectedFilters.cuisine.includes(cuisine) }"
              @click="toggleFilterOption('cuisine', cuisine)"
            >
              {{ cuisine }}
            </b-button>
          </b-button-group>
        </div>
        <div class="filter-category">
          <h5>Diet</h5>
          <b-button-group class="mb-2">
            <b-button
              v-for="diet in diets"
              :key="diet"
              :class="{ selected: selectedFilters.diet.includes(diet) }"
              @click="toggleFilterOption('diet', diet)"
            >
              {{ diet }}
            </b-button>
          </b-button-group>
        </div>
        <div class="filter-category">
          <h5>Intolerance</h5>
          <b-button-group class="mb-2">
            <b-button
              v-for="intolerance in intolerances"
              :key="intolerance"
              :class="{ selected: selectedFilters.intolerance.includes(intolerance) }"
              @click="toggleFilterOption('intolerance', intolerance)"
            >
              {{ intolerance }}
            </b-button>
          </b-button-group>
        </div>
      </div>
      <div v-if="showResults" class="search-results">
        <RecipePreviewList
          title="Found Recipes"
          class="FoundRecipes"
          :recipes="sortedRecipes"
          :numSearch="this.numResults"
          
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { searchRecipes } from "../services/recipes";

export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      searchQuery: "",
      numResults: 5,
      resultOptions: [5, 10, 15],
      sortOptions: ["likes", "time"],
      sortOption: "time", // Default sort option
      showFilter: false,
      showResults: false,
      cuisines: [
        "Italian",
        "Thai",
        "French",
        "Greek",
        "Chinese",
        "Mexican",
        "German",
        "Indian",
        "Japanese",
      ],
      diets: ["Vegetarian", "Vegan"],
      intolerances: ["Gluten", "Dairy", "Peanut", "Seafood", "Soy"],
      selectedFilters: {
        cuisine: [],
        diet: [],
        intolerance: [],
      },
      recipes: [],
    };
  },
  computed: {
    sortedRecipes() {
      let sorted = [...this.recipes];
      if (this.sortOption === "likes") {
        sorted.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      } else if (this.sortOption === "time") {
        sorted.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      }
      return sorted;
    },
  },
  methods: {
    onSearch() {
      this.fetchRecipes();
    },
    async fetchRecipes() {
      try {
        // Call the search function with appropriate parameters
        const recipes = await searchRecipes(
          this.searchQuery,
          this.selectedFilters.cuisine,
          this.selectedFilters.diet,
          this.selectedFilters.intolerance,
          this.numResults
        );

        // Check the fetched recipes
        console.log("Fetched Recipes:", recipes);

        // Update the state with the fetched recipes
        this.recipes = recipes;
        this.showResults = true; // Ensure that results are displayed
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
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
    },
  },
};
</script>

<style scoped>
/* Existing styles */
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow-y: auto; /* Enable scrolling if content overflows vertically */
  position: relative; /* Ensure relative positioning for absolute child elements */
}

.icon-container {
  position: absolute;
  margin-left: 10%;
  margin-top: 25px;
  transform: translateX(-50%);
}

.icon {
  width: 150px; /* Adjust size as needed */
  height: 150px; /* Adjust size as needed */
  margin-top: 10px;
  position: absolute center;
}

.search-container {
  width: 100%;
  max-width: 650px;
  background-color: rgba(255, 255, 255, 0.8); /* Example background color for clarity */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Example box shadow for clarity */
  padding: 20px;
  margin-top: 250px; /* Adjust margin top to create space for icon */
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
  width: 62px;
  margin-right: 10px;
}

.sort-select {
  width: 120px; /* Adjust width as needed */
  margin-right: 10px;
}

.filter-button {
  border-color: black;
  background-color: black;
  white-space: nowrap;
  color: white;
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

.filter-category .mb-2 {
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap to the next line */
}

.filter-category .mb-2 .btn {
  margin-right: 10px; /* Add space between buttons */
  margin-bottom: 5px; /* Add space below buttons for better wrapping */
  color: #e97f29;
  background-color: rgb(240, 236, 236);
  border-color: black;
  padding: 5px 10px; /* Adjust padding to make buttons smaller */
  font-size: 0.8em; /* Adjust font size to make text smaller */
  flex: 1 0 auto; /* Adjust flex property to allow auto width */
  max-width: 120px; /* Set a maximum width to make buttons narrower */
}

.filter-category .mb-2 .btn:hover {
  color: white;
  background-color: #e97f29;
}

.filter-category .mb-2 .btn.selected {
  background-color: #e97f29; /* Highlight selected options in orange */
  color: white;
}

.filter-category h5 {
  color: black; /* Change the color to your desired color */
}

.filter-category .mb-2 .btn:last-child {
  margin-right: 0; /* Remove the margin from the last button */
}

.search-results {
  width: 100%;
  max-width: 650px;
  background-color: rgba(255, 255, 255, 0.8); /* Example background color for clarity */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Example box shadow for clarity */
  padding: 20px;
  margin-top: 20px; /* Add margin top */
}
</style>
