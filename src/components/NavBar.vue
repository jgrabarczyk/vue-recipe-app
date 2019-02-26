<template>
  <div id="nav" class="nav">
    <router-link to="/" class="brand">{{title}}</router-link>
    <searchBar/>

    <nav>
      <router-link :to="{ name: 'recipe-list' }">Home</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
    </nav>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar.vue";
export default {
  components: {
    searchBar
  },
  data() {
    return {
      title: "Recipe App"
    };
  }
};
</script>

<style scoped>
.nav {
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-image: linear-gradient(hsl(120, 65%, 35%), hsl(120, 65%, 75%));
  margin-bottom: 2rem;
}
a {
  color: #fff;
  padding: 0 15px;
}
a:hover {
  color: gold;
}
.brand {
}
</style>