<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
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
    <div class="recipe-footer">
      <div class="title">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
      </div>
      <ul class="recipe-overview">
        <img src="@/assets/time2.png" alt="Icon" class="time-icon" />
        <li class="recipe-readyInMinutes">{{ recipe.readyInMinutes }} minutes</li>
        <img src="@/assets/heart-empty.png" alt="Icon" class="like-icon" />
        <li>{{ recipe.aggregateLikes }} likes</li>
        <div>
          <button @click.stop="toggleFavorite" :class="['favorite-button', { 'favorite-active': !isFavorite }]" class="favorite-button">
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
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  data() {
    return {
      // image_load: false
      isFavorite: false // Track if the recipe is added to favorites
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = true;
      this.$emit('toggle-favorite', this.recipe.id);
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
  width: 550px; /* Set fixed width */
  height: 280px; /* Set fixed height */
  position: relative;
  margin: 10px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.recipe-preview:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

/* .recipe-preview:hover{
  transform: scale(1.05); /* Increase size on hover */
/* }  */

.diet-icons {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
}

.diet-icons li {
  margin-left: 5px;
}

.diet-icon {
  width: 60px;
  height: 60px;
  /* Add additional styling as needed */
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
}

.recipe-overview {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  display: flex;
  /* justify-content: space-between; */
}

.recipe-readyInMinutes{
  margin-right: 90px;
}

.time-icon{
  width: 19px; /* Adjust size as needed */
  height: 19px; /* Adjust size as needed */
  margin-top: 2px;
  margin-right: 5px;
  margin-left: 5px;
}

.like-icon{
  width: 16px; /* Adjust size as needed */
  height: 16px; /* Adjust size as needed */
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
  margin-left: 45px;
  border-radius: 5px;
  font-weight: bold;
}

.favorite-button.favorite-active {
  margin-left: 63px;
}

/* .favorite-button:hover {
  background-color: #e5761b;
} */

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