<template src="./app.html"></template>
<style src="./main.css"></style>
<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import RecipeService from "@/services/RecipeService.js";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      recipes: [],
      categories: [],
      ingridients: []
    };
  },

  created() {
    RecipeService.getRecipes()
      .then(response => {
        this.recipes = response.data;
        localStorage.setItem("recipes", JSON.stringify(this.recipes));
      })
      .then(response => {
        this.categories = this.recipes.map(element => {
          return element.cat;
        });
        localStorage.setItem("categories", JSON.stringify(this.categories));
      })
      .then(response => {
        let ingridientsArrays = this.recipes.map(element => {
          return element.ingridients.map(el => {
            return el.ingridient.name;
          });
        });

        ingridientsArrays.forEach(element => {
          element.map(el => {
            this.ingridients.push(el);
          });
        });
        let uniqIngridients = this.ingridients.reduce(function(a,b){
          if (a.indexOf(b) < 0 ) a.push(b);
          return a;
        },[]);

        localStorage.setItem("ingridients", JSON.stringify(uniqIngridients.sort()));
      })
      .catch(error => {
        console.log("(RecipeService) There was an error:", error.response);
      });
  }
};
</script>