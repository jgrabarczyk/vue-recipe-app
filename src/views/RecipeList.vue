<template>
  <div>
    <h1 class="main-title">Recipe Lists</h1>
    <div class="recipeBox__wrapper">
      <RecipeBox v-for="recipe in filteredRecipes" :key="recipe.id" :recipe="recipe"/>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
import RecipeBox from "@/components/RecipeBox.vue";

import Sidebar from "@/components/Sidebar/Sidebar.vue";
export default {
  components: {
    RecipeBox
  },
  data() {
    return {
      filteredRecipes: []
    };
  },
  methods: {
  },
  created() {    
    bus.$on('filters', data =>{
      this.filteredRecipes = data;
    })
  },
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
