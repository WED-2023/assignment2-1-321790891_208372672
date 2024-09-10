<template>
  <router-link
    :to="linkTo"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <!-- Recipe Image and Overlay -->
      <img :src="recipe.image" class="recipe-image" />
      <div class="image-overlay">View Recipe</div>
      
      <!-- Diet Icons -->
      <ul class="diet-icons">
        <li v-if="recipe.vegetarian">
          <img src="@/assets/vegetarian.png" alt="Vegetarian" class="diet-icon" />
        </li>
        <li v-if="recipe.vegan">
          <img src="@/assets/vegan.png" alt="Vegan" class="diet-icon" />
        </li>
        <li v-if="recipe.glutenFree">
          <img src="@/assets/gluten.png" alt="Gluten-Free" class="diet-icon" />
        </li>
      </ul>
    </div>

    <!-- Recipe Footer -->
    <div class="recipe-footer" :class="{ 'recipe-footer-viewed': viewed }">
      <div class="title">
        <div :title="recipe.title" class="recipe-title" >
          {{ recipe.title }}
        </div>
      </div>
      <ul class="recipe-overview">
        <img src="@/assets/time2.png" alt="Icon" class="time-icon" />
        <li class="recipe-readyInMinutes">{{ recipe.readyInMinutes }} minutes</li>
        <img src="@/assets/heart-empty.png" alt="Icon" class="like-icon" />
        <li>{{ recipe.aggregateLikes }} likes</li>
        <div>
          <button @click.stop.prevent="toggleFavorite" :class="['favorite-button', { 'favorite-active': !isFavorite }]" class="favorite-button">
            <img :src="isFavorite ? require('@/assets/favorite-full.jpg') : require('@/assets/favorite-empty.jpg')" alt="Favorite Icon" class="favorite-icon" />
            {{ isFavorite ? 'Added To Favorites' : 'Add To Favorites' }}
          </button>
        </div>
      </ul>
      <div class="recipe-indicators">
        <span v-if="recipe.viewed" class="viewed-indicator">Viewed</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { toggleFavoriteRecipe } from "../services/recipes.js";
export default {
  data() {
    return {
      isFavorite: false, // Track if the recipe is added to favorites
      viewed: false // Track if the recipe has been viewed
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    isFamilyRecipe: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    linkTo() {
      return this.isFamilyRecipe
        ? { name: 'RecipeFullView', params: { recipeId: this.recipe.id } }
        : { name: 'recipe', params: { recipeId: this.recipe.id } };
    }
  },
  created() {
    const viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
    this.viewed = viewedRecipes.includes(this.recipe.id);
  },
  mounted() {
   
  },
  methods: {
    async toggleFavorite() {
      this.isFavorite = !this.isFavorite; // Toggle the favorite state
      try {
        // Call the API to add or remove the favorite
        await toggleFavoriteRecipe(this.recipe.id, this.isFavorite);

        // Emit an event to inform the parent component
        this.$emit('toggle-favorite', this.recipe.id, this.isFavorite);

        console.log(`Successfully ${this.isFavorite ? 'added' : 'removed'} recipe ${this.recipe.id} from favorites.`);
      } catch (error) {
        // Revert the favorite state if there's an error
        this.isFavorite = !this.isFavorite;
        console.error('Failed to toggle favorite:', error.message);
      }
    }
  }
};
</script>

<style scoped>

/* Remove underline on hover */
.recipe-preview,
.recipe-preview:hover {
  text-decoration: none;
}

.recipe-preview {
  display: inline-block;
  width: 550px; 
  height: 280px;
  position: relative;
  margin: 10px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  transition: box-shadow 0.3s, text-decoration 0.3s; /* Added text-decoration transition */
}

.recipe-preview:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.recipe-preview:hover .recipe-title {
  text-decoration: underline; /* Underline only the recipe title on hover */
}

.recipe-body {
  position: relative;
  width: 100%;
  height: 200px;
}

.recipe-body .recipe-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 200px;
  opacity: 0;
  transition: opacity 0.3s;
}

.recipe-preview:hover .image-overlay {
  display: block;
  opacity: 1;
}

.diet-icons {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 10px; 
  right: 10px;
}

.diet-icons li {
  margin-left: 5px;
}

.diet-icon {
  width: 60px;
  height: 60px;
}

.recipe-footer {
  padding: 10px;
  background-color: white;
  color: black;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.recipe-title {
  font-size: 14pt;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  margin-left: 5px;
  transition: text-decoration 0.3s; /* Smooth transition for underline */
}

.recipe-footer-viewed {
  color: #5059ac; /* Change text color to blue for viewed recipes */
}

.recipe-overview {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  display: flex;
}

.recipe-readyInMinutes {
  margin-right: 70px;
}

.time-icon {
  width: 19px; 
  height: 19px; 
  margin-top: 2px;
  margin-right: 5px;
  margin-left: 5px;
}

.like-icon {
  width: 16px; 
  height: 16px; 
  margin-top: 4px;
  margin-right: 5px;
}

.recipe-overview li {
  font-size: 12pt;
}

.favorite-button {
  background-color: transparent;
  border: none;
  color: #e97f29;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12pt;
  padding: 0px 10px;
  margin-left: 35px;
  border-radius: 5px;
  font-weight: bold;
}

.favorite-button.favorite-active {
  margin-left: 45px;
}

.favorite-icon {
  width: 19px;
  height: 19px;
  margin-right: 5px;
}

.recipe-indicators {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.viewed-indicator {
  color: green;
}
</style>
