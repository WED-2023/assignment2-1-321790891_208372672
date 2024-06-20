<template>
    <div class="create-recipe-page">
      <h1>Create New Recipe</h1>
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Recipe Name">
          <b-form-input v-model="recipe.name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Preparation Time">
          <b-form-input v-model="recipe.preparationTime" type="number" required></b-form-input>
        </b-form-group>
        
        <!-- Ingredients Section -->
        <b-form-group label="Ingredients">
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="d-flex align-items-center mb-2">
            <b-form-input v-model="recipe.ingredients[index]" placeholder="e.g. 2 cups flour, sifted" required></b-form-input>
            <b-button size="sm" variant="danger" @click="removeIngredient(index)" class="remove-button">Remove</b-button>
          </div>
          <b-button variant="success" @click="addIngredient" class = "add-button">Add Ingredient</b-button>
        </b-form-group>
        
        <!-- Instructions Section -->
        <b-form-group label="Instructions">
          <div v-for="(instruction, index) in recipe.instructions" :key="index" class="d-flex align-items-center mb-2">
            <b-form-input v-model="recipe.instructions[index]" placeholder="add instruction" required></b-form-input>
            <b-button size="sm" variant="danger" @click="removeInstruction(index)" class="remove-button">Remove</b-button>
          </div>
          <b-button variant="success" @click="addInstruction" class = "add-button">Add Instruction</b-button>
        </b-form-group>
        
        <b-form-group label="Portions">
          <b-form-input v-model="recipe.portions" type="number" required></b-form-input>
        </b-form-group>
        
         <!-- Dietary Information Section -->
      <b-form-group label="Dietary Information">
        <b-button :variant="recipe.isVegan ? 'success' : 'secondary'" @click="toggleDietaryInfo('isVegan')" class="dietary-button">Vegan</b-button>
        <b-button :variant="recipe.isVegetarian ? 'success' : 'secondary'" @click="toggleDietaryInfo('isVegetarian')" class="dietary-button">Vegetarian</b-button>
        <b-button :variant="recipe.isGlutenFree ? 'success' : 'secondary'" @click="toggleDietaryInfo('isGlutenFree')" class="dietary-button">Gluten Free</b-button>
      </b-form-group>
        <b-button type="submit" variant="primary" class = "submit-b" >Create Recipe</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      recipe: {
        name: '',
        preparationTime: 0,
        ingredients: [''],
        instructions: [''],
        portions: 1,
        isVegan: false,
        isVegetarian: false,
        isGlutenFree: false,
      }
    };
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push('');
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.recipe.instructions.push('');
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
    },
    toggleDietaryInfo(type) {
      this.recipe[type] = !this.recipe[type];
    },
    submitForm() {
      // Handle the recipe creation logic
      console.log('New Recipe Created:', this.recipe);
      this.$router.push('/'); // Navigate back to home page after creation
    }
  }
};
</script>


<style scoped>
.create-recipe-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.remove-button {
    color:white;
    background-color: black;
    border-color: black;
}
.add-button{
    color: white;
    background-color: #d16c3d;
    border-color: white;
}
.submit-b{
    background-color: black;
    border-color: black;
    margin-left: 30%;
    width: 50%;
}
.create-recipe-page .d-flex {
  display: flex;
  gap: 10px;
}

.create-recipe-page .mb-2 {
  margin-bottom: 10px;
}
.dietary-button {
  margin-right: 10px;
}
</style>