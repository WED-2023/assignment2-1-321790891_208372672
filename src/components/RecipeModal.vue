<template>
  <b-modal :visible="show" @hide="closeModal">
    <template #modal-title>
      <h5>Create New Recipe</h5>
    </template>

    <b-form @submit.prevent="submitForm">
      <b-form-group label="Recipe Name">
        <b-form-input v-model="recipe.name" required></b-form-input>
      </b-form-group>
      
      <!-- Recipe Image URL Section -->
      <b-form-group label="Recipe Image URL">
        <b-form-input v-model="recipe.imageUrl" placeholder="e.g. https://example.com/image.jpg" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Preparation Time">
        <b-form-input v-model="recipe.preparationTime" type="number" required></b-form-input>
      </b-form-group>

      <!-- Ingredients Section -->
      <b-form-group label="Ingredients" class="ingr-items">
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="d-flex align-items-center mb-2">
          <b-form-input v-model="ingredient.name" placeholder="e.g. flour" class="ingredient-name" required></b-form-input>
          <b-form-input v-model="ingredient.amount" type="number" placeholder="Amount" class="ingredient-amount ml-2" required></b-form-input>
          <b-form-select v-model="ingredient.unit" :options="measurementUnits" class="ingredient-unit ml-2" required></b-form-select>
          <b-button size="sm" variant="danger" @click="removeIngredient(index)" class="ml-2">Remove</b-button>
        </div>
        <b-button variant="success" @click="addIngredient">Add Ingredient</b-button>
      </b-form-group>

      <!-- Instructions Section -->
      <b-form-group label="Instructions">
        <div v-for="(instruction, index) in recipe.instructions" :key="index" class="d-flex align-items-center mb-2">
          <b-form-input v-model="instruction.name" :placeholder="'Step ' + (index + 1)" rows="3" required></b-form-input>
          <b-button size="sm" variant="danger" @click="removeInstruction(index)" class="ml-2">Remove</b-button>
        </div>
        <b-button variant="success" @click="addInstruction">Add Instruction</b-button>
      </b-form-group>

      <b-form-group label="Portions">
        <b-form-input v-model="recipe.portions" type="number" required></b-form-input>
      </b-form-group>

      <!-- Summary Section -->
      <b-form-group label="Summary">
        <b-form-textarea v-model="recipe.summary" placeholder="Brief summary of the recipe" rows="3" required></b-form-textarea>
      </b-form-group>

      <!-- Dietary Information Section -->
      <b-form-group label="Dietary Information">
        <b-form-checkbox v-model="recipe.isVegan">Vegan</b-form-checkbox>
        <b-form-checkbox v-model="recipe.isVegetarian">Vegetarian</b-form-checkbox>
        <b-form-checkbox v-model="recipe.isGlutenFree">Gluten Free</b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">Create Recipe</b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'RecipeModal',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      measurementUnits: ['tsp', 'cup', 'spoon', 'g', 'kg', 'ml', 'l'],
      recipe: {
        name: '',
        imageUrl: '',
        preparationTime: 0,
        ingredients: [
          {
            name: '',
            amount: 0,
            unit: 'tsp'
          }
        ],
        instructions: [''],
        portions: 1,
        summary: '',
        isVegan: false,
        isVegetarian: false,
        isGlutenFree: false
      }
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitForm() {
      // Handle the recipe creation logic here
      console.log('New Recipe Created:', this.recipe);
      this.$emit('close');
    },
    addIngredient() {
      this.recipe.ingredients.push({ name: '', amount: 0, unit: 'tsp' });
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.recipe.instructions.push('');
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}
.ingredient-name {
  flex: 3; /* Adjust the flex value to make this input wider */
}

.ingredient-amount {
  flex: 1; /* Adjust the flex value to make this input smaller */
}

.ingredient-unit {
  flex: 1; /* Adjust the flex value to make this select box a moderate size */
}

/* Adjust the sizes as per your design requirements */
.input.box {
  width: 100%; /* Ensure the input takes the full width of its flex container */
}

.ml-2 {
  margin-left: 8px;
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>