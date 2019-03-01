<template>
  <div class="rs -shadow">
    <div class="rs__heading">
      <img class="rs__img" :src="recipe.img" :alt="recipe.title">
      <RecipeSingleCaption
        :title="recipe.title"
        :category="recipe.cat"
        :difficulty="recipe.difficulty_lvl"
        :preptime="recipe.prep_time_in_min"
      />
    </div>
    <div class="rs__content">
      <IngridientsList :ingridients="ingridients"/>
      <PreparationSteps :prepSteps="prepSteps"/>
    </div>
  </div>
</template>

<script>
import RecipeService from "@/services/RecipeService.js";

import RecipeSingleCaption from "@/components/RecipeSingle/RecipeSingleCaption.vue";
import IngridientsList from "@/components/RecipeSingle/IngridientsList.vue";
import PreparationSteps from "@/components/RecipeSingle/PreparationSteps.vue";

export default {
  props: ["id"],

  components: {
    RecipeSingleCaption,
    IngridientsList,
    PreparationSteps
  },

  data() {
    return {
      recipe: {}
    };
  },

  created() {
    RecipeService.getRecipe(this.id)
      .then(response => {
        this.recipe = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },

  computed: {
    ingridients() {
      return this.recipe.ingridients;
    },
    prepSteps() {
      return this.recipe.prep_steps;
    }
  }
};
</script>

<style scoped>
.rs {
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto 2rem;
}
.rs__heading {
  flex: 0 0 100%;
  position: relative;
}
.rs__info {
  font-style: italic;
}
.rs__content {
  padding: 2rem;
}
</style>