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
export default {
  components: {},

  data() {
    return {
      search: "",
      recipes: [],
      showSearchBar: true
    };
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