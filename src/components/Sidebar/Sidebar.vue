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

    <searchBar class="filter" />
    <categoryBar class="filter" />
    <ingridientsBar class="filter" />
    <div class="reset btn" @click="resetFilters">Reset filters X</div>
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
      isScrolledTop: true,
      //
      recipes: [],
      search: "",
      categories: "",
      ingridents: [],
      selectedCat: "",
      selectedIngridients: []
    };
  },

  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive;
    },

    onkey(e) {
      if (e.key == "Escape" && this.isActive) {
        this.isActive = false;
      }
      if (e.key == "f" && !this.isActive) {
        this.isActive = true;
      }
    },

    documentClick(e) {
      if (!document.getElementById("sidebar").contains(e.target)) {
        this.isActive = false;
      }
    },

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
    },
    filterRecipes() {
      let category, filteredRecipes;
      category = this.selectedCat;

      filteredRecipes =
        this.search == ""
          ? this.recipes
          : this.filterList(this.search, this.recipes);

      filteredRecipes =
        this.selectedCat == "" || this.selectedCat == "All"
          ? filteredRecipes
          : filteredRecipes.filter(recipe => recipe.cat == category);

      if (
        this.selectedIngridients.length == 0 ||
        this.selectedIngridients == "Default"
      ) {
        return filteredRecipes;
      }

      filteredRecipes = filteredRecipes.filter(recipe => {
        if (
          recipe.ingridients
            .map(el => el.name)
            .some(r => this.selectedIngridients.includes(r))
        ) {
          return recipe;
        }
      });

      return filteredRecipes;
    },

    updateFilters() {
      bus.$emit("filters", this.filterRecipes());
    },
    resetFilters() {
      bus.$emit("filters", this.recipes);
    }
  },
  created() {
    document.addEventListener("click", this.documentClick);
    document.addEventListener("keyup", this.onkey);
    bus.$on("handleScroll", data => {
      this.isScrolledTop = data;
    });

    bus.$on("submitSearch", data => {
      this.search = data;
      this.updateFilters();
    });
    bus.$on("submitCategories", data => {
      this.selectedCat = data;
      this.updateFilters();
    });
    bus.$on("submitIngridients", data => {
      this.selectedIngridients = data;
      this.updateFilters();
    });
  },
  mounted() {
    this.recipes = JSON.parse(localStorage.getItem("recipes"));
    this.categories = JSON.parse(localStorage.getItem("categories"));
    this.ingridents = JSON.parse(localStorage.getItem("ingridients"));
    bus.$emit("filters", this.recipes);
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick);
    document.removeEventListener("keyup", this.onkey);
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

  z-index: 3;
  transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1),
    top 0.5s ease-in-out;
  transform: translate(-100%, 0);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  min-width: 300px;
  width: 300px;
}
.sidebar .filter {
  margin-bottom: 2rem;
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