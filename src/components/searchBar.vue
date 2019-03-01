<template>
  <input
    v-if="showSearchBar"
    type="text"
    v-model="search"
    @keyup="submitSearch"
    placeholder="search"
  >
</template>

<script>
import { bus } from "../main";
import RecipeService from "@/services/RecipeService.js";
export default {
  components: {},

  data() {
    return {
      search: "",
      recipes: [],
      showSearchBar: true
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
  },
  methods: {
    submitSearch() {
      console.log("searchbar: " + this.search);
      bus.$emit("submitSearch", this.search);
    }
  },
  watch: {
    $route: function() {
      this.showSearchBar = this.$route.path === "/" ? true : false;
    }
  }
};
</script>

<style scoped>
input {
  padding: 10px;
}
</style>