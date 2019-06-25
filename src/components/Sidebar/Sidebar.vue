<template>
  <div
    id="sidebar"
    class="sidebar -shadow"
    v-bind:class="{ active: isActive, bumped : isScrolledTop }"
  >
    <div
      class="toggle-sidebar"
      v-on:click="toggleSidebar"
      v-bind:class="{ active: isActive }"
    >Filter</div>

    <searchBar/>
    <categoryBar/>
    <ingridientsBar/>
  </div>
</template>

<script>
import { bus } from "../../main";

import searchBar from "@/components/searchBar.vue";
import categoryBar from "@/components/CategoryBar.vue";
import ingridientsBar from "@/components/IngridientsBar.vue";

export default {
  components: {
    searchBar,
    categoryBar,
    ingridientsBar
  },
  data() {
    return {
      isActive: false,
      isScrolledTop: true
    };
  },

  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive;
    },

    documentClick(e) {      
      console.log(e.target);
      if (!document.getElementById("sidebar").contains(e.target)) {
        this.isActive = false;
      }
    }
  },
  created() {
    document.addEventListener("click", this.documentClick);

    bus.$on("handleScroll", data => {
      this.isScrolledTop = data;
    });
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick);
  }
};
</script>

<style  scoped>
.sidebar {
  position: fixed;
  background: white;
  top: 48px;
  bottom: 0;
  left: 0px;
  width: 33%;
  z-index: 3;
  transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1),
    top 0.5s ease-in-out;
  transform: translate(-100%, 0);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  /* align-content: center; */
  padding: 1rem;

}

.sidebar.active {
  transform: translateX(0);
}

.toggle-sidebar {
  position: absolute;
  left: 100%;
  bottom: 0;
  background-color: white;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.5s ease, opacity 0.5s ease,
    transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform: translate(0);
  z-index: 3;
}
.toggle-sidebar:hover {
  background-color: #999;
}
.bumped {
  top: 80px;
}
</style>