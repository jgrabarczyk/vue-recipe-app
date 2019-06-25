<template src="./NavBar.html"></template>
<style scoped src="./NavBar.css"></style>

<script>
import { bus } from "../../main";

import searchBar from "@/components/searchBar.vue";
import categoryBar from '@/components/CategoryBar.vue';
import ingridientsBar from '@/components/IngridientsBar.vue';

export default {
  components: {
    searchBar,
    categoryBar,
    ingridientsBar
  },

  data() {
    return {
      title: "Recipe App",
      isScrolledTop: true
    };
  },

  methods: {
    handleScroll(event) {      
      this.isScrolledTop = window.scrollY == 0 ? true : false;
      bus.$emit("handleScroll", this.isScrolledTop);
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>