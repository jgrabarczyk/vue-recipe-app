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
  computed: {
    filterRecipes() {
      return this.filterList(this.search, this.recipes);
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
