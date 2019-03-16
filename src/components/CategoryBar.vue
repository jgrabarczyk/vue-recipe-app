<template>
  <div>
    <select v-model="selectedCat" v-on:change="submtiCategories">
      <option v-for="(cat, index) in categories" :key="index">{{cat}}</option>      
    </select>
  </div>
</template>

<script>
import { bus } from "../main";
import RecipeService from "@/services/RecipeService.js";
export default {
  data() {
    return {
      recipes: [],
      categories: [],
      selectedCat: ''
    }
  },
  methods: {
    submtiCategories(e) {                          
      console.log(this.selectedCat);
      bus.$emit("submitCategories", this.selectedCat);
    }
  },
  created() {
    RecipeService.getRecipes()
      .then(response => {
        this.recipes = response.data;
      })  
      .then(response =>{
        this.categories = this.recipes.map(element =>{
          return element.cat;
        });
        this.categories.unshift('');
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },

}
</script>
  

<style>

</style>
