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
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
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
      this.$emit('toggle-favorite', this.recipe.id);
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 500px; /* Set fixed width */
  height: 300px; /* Set fixed height */
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
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.recipe-title {
  font-size: 16pt;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-overview {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}

.recipe-overview li {
  font-size: 12pt;
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