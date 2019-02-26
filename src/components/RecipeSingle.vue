<template>
  <div>
    <img class="recipeBox__img" v-bind:src="recipe.img" v-bind:alt="recipe.title">
    <h2 class="recipeBox__title">{{recipe.title}}</h2>
    <p class="recipeBox__cat">category:{{recipe.cat}}</p>
  </div>
</template>

<script>
import RecipeService from "@/services/RecipeService.js";

export default {
  props: ["id"],
  data() {
    return {
      recipe: {}
    };
  },
  created() {
    RecipeService.getRecipe(this.id)
      .then(response => {
        this.recipe = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>

<style scoped>
</style>