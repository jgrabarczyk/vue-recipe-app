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
export default {
  components: {
    RecipeBox
  },
  data() {
    return {
      recipes: [],
      search: "",
      categories: "",
      ingridents: [],
      selectedCat: "",
      selectedIngridients: []
    };
  },
  methods: {
    filterList(q, list) {
      function escapeRegExp(s) {
        return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      const words = q
        .split(/\s+/g)
        .map(s => s.trim())
        .filter(s => !!s);
      const hasTrailingSpace = q.endsWith(" ");
      const searchRegex = new RegExp(
        words
          .map((word, i) => {
            if (i + 1 === words.length && !hasTrailingSpace) {
              // The last word - ok with the word being "startswith"-like
              return `(?=.*\\b${escapeRegExp(word)})`;
            } else {
              // Not the last word - expect the whole word exactly
              return `(?=.*\\b${escapeRegExp(word)}\\b)`;
            }
          })
          .join("") + ".+",
        "gi"
      );
      return list.filter(item => {
        return searchRegex.test(item.title);
      });
    }
  },
  created() {
    bus.$on("submitSearch", data => {
      this.search = data;
    });
    bus.$on("submitCategories", data => {
      this.selectedCat = data;
    });
    bus.$on("submitIngridients", data => {
      this.selectedIngridients = data;
    });
  },
  mounted() {
    this.recipes = JSON.parse(localStorage.getItem("recipes"));
    this.categories = JSON.parse(localStorage.getItem("categories"));
    this.ingridents = JSON.parse(localStorage.getItem("ingridients"));
  },

  computed: {
    filterRecipes() {
      let category, filteredRecipes;
      category = this.selectedCat;

      filteredRecipes =
        this.search == ""
          ? this.recipes
          : this.filterList(this.search, this.recipes);

      filteredRecipes =
        this.selectedCat == "" || this.selectedCat =="All"
          ? filteredRecipes
          : filteredRecipes.filter(recipe => recipe.cat == category);

      if (this.selectedIngridients.length == 0 || this.selectedIngridients == "Default" ) {
        return filteredRecipes;
      }      

      filteredRecipes = filteredRecipes.filter(recipe => {
        if (
          recipe.ingridients
            .map(el => el.name)
            .some(r => this.selectedIngridients.includes(r))
        ) {
          return recipe;
        }
      });

      return filteredRecipes;
    }
  }
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
