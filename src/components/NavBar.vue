<template>
  <div
    id="nav"
    class="nav -shadow"
    v-bind:class="{floating : isTopFlag}"
    v-on:scroll="handleScroll"
  >
    <router-link to="/" class="brand">{{title}}</router-link>
    <searchBar/>
    <categoryBar/>
    <nav>
      <router-link :to="{ name: 'recipe-list' }">Home</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
    </nav>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar.vue";
import categoryBar from '@/components/CategoryBar.vue';
export default {
  components: {
    searchBar,
    categoryBar
  },
  data() {
    return {
      title: "Recipe App",
      isTopFlag: true
    };
  },

  methods: {
    handleScroll(event) {
      let isScrolledTop = window.scrollY == 0 ? true : false;
      if (isScrolledTop && this.isTopFlag == true) {
        this.isTopFlag = false;
      }

      if (!isScrolledTop && this.isTopFlag == false) {
        this.isTopFlag = true;
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
//
</script>

<style scoped>
.nav {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-image: linear-gradient(hsl(120, 65%, 35%), hsl(120, 65%, 75%));
  margin-bottom: 2rem;
  align-items: center;
  min-height: 5rem;
  position: fixed;
  z-index: 3;
  width: 100%;
  margin-top: -1rem;
  transition: 0.5s ease-in-out;
  top: 1rem;
}
.nav.floating {
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  min-height: 3rem;
}
input {
  transition: 0.5s ease-in-out;
}
.nav.floating input {
  padding: 5px 10px;
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