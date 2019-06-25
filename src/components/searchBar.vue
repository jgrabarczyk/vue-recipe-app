<template>
  <div>
    <label for="search">Search by ttitle:</label>
    <input
      v-if="showBar"
      type="text"
      v-model="search"
      @keyup="submitSearch"
      placeholder="search"
      name="search"
    >
  </div>
</template>

<script>
import { bus } from "../main";
export default {
  data() {
    return {
      search: "",
      recipes: [],
      showBar: true
    };
  },

  methods: {
    submitSearch() {
      bus.$emit("submitSearch", this.search);
    }
  },

  watch: {
    $route: function() {
      this.showBar = this.$route.path === "/" ? true : false;
    }
  }
};
</script>

<style scoped>
input {
  padding: 10px;
}
</style>