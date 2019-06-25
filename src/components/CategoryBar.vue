<template>
  <div>
    <label for="category">Choose category</label>
    <select v-if="showBar" v-model="selectedCat" v-on:change="submtiCategories" name="category">
      <option>All</option>
      <option v-for="(cat, index) in categories" :key="index">{{cat}}</option>
    </select>
  </div>
</template>

<script>
import { bus } from "../main";
export default {
  
  data() {
    return {
      categories: [],
      selectedCat: "",
      showBar: true
    };
  },

  methods: {
    submtiCategories() {
      bus.$emit("submitCategories", this.selectedCat);
    }
  },

  mounted() {
    this.categories = JSON.parse(localStorage.getItem("categories"));
  },

  watch: {
    $route: function() {
      this.showBar = this.$route.path === "/" ? true : false;
    }
  }
};
</script>
<style scoped>
select{
  padding: 10px;
}
</style>
