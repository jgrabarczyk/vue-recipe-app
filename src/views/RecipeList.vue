<template>
  <div>
    <h1 class="main-title">Recipe Lists</h1>
    <div class="recipeBox__wrapper">
      <RecipeBox v-for="recipe in filterRecipes" :key="recipe.id" :recipe="recipe"/>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
import RecipeBox from "@/components/RecipeBox.vue";
import RecipeService from "@/services/RecipeService.js";
export default {
  components: {
    RecipeBox
  },
  data() {
    return {
      recipes: [],
      search: ""
    };
  },
  created() {
    RecipeService.getRecipes()
      .then(response => {
        this.recipes = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
    bus.$on("submitSearch", data => {
      this.search = data;
    });
  },
  computed: {
    filterRecipes() {
      return this.recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {}
};
</script>

<style>
.main-title {
  margin: 1rem;
  font-size: 3rem;
}
.recipeBox__wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
