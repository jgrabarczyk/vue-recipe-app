<template src="./NavBar.html"></template>
<style scoped src="./NavBar.css"></style>

<script>
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
      isScrolledTop: false
    };
  },

  methods: {
    handleScroll(event) {
      this.isScrolledTop = window.scrollY == 0 ? true : false;
      console.log(this.isScrolledTop);
      // if (isScrolledTop && this.isScrolledTop ) {
      //   this.isScrolledTop = false;
      // }

      // if (!isScrolledTop && !this.isScrolledTop) {
      //   this.isScrolledTop = true;
      // }
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