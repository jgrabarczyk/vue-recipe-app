<template>
  <div class="rs -shadow">
    <div class="rs__heading">
      <img class="rs__img" v-bind:src="recipe.img" v-bind:alt="recipe.title">
      <div class="rs__caption">
        <h1 class="rs__title">{{recipe.title}}</h1>
        <p class="rs__info">
          <span class="rs__info--label">Category:</span>
          {{recipe.cat}}
        </p>
        <p class="rs__info">
          <span class="rs__info--label">Difficulty:</span>
          {{recipe.difficulty_lvl}}
        </p>
        <p class="rs__info">
          <span class="rs__info--label">Preparation Time:</span>
          {{recipe.prep_time_in_min}}
        </p>
      </div>
    </div>
    <div class="rs__content">
      <h2 class="rs__content--title">Ingridients:</h2>
      <ul class="rs__list ingridients">
        <li class="rs__list--item" v-for="single in ingridients" v-bind:key="single">
          {{single.ingridient.name}}
          <span>,{{single.ingridient.amount}} times</span>
        </li>
      </ul>
      <h2 class="rs__content--title">Steps:</h2>
      <ol class="rs__list steps">
        <li class="rs__list--item" v-for="single in prepSteps" v-bind:key="single">
          <h3>{{single.step.title}}</h3>
          <p>{{single.step.caption}}</p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import RecipeService from "@/services/RecipeService.js";

export default {
  props: ["id"],
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
.rs__list {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.rs__list .rs__list--item {
  margin-bottom: 0.5rem;
}
.rs__list .rs__list--item span {
  font-weight: normal;
  font-style: italic;
  font-size: 0.875rem;
}
.rs__list .rs__list--item h3 {
  margin-bottom: 0.5rem;
}
.rs__list .rs__list--item p {
  line-height: 1.15;
}
.rs__list.ingridients .rs__list--item {
  list-style-type: disc;
  font-weight: bold;
}

.rs__list.steps .rs__list--item {
  list-style-type: decimal;
  margin-bottom: 1.5rem;
}

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
@media (min-width: 768px) {
  .rs__caption {
    position: absolute;
  }
}
.rs__caption {
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: hsla(0, 0%, 100%, 0.65);
}
.rs__info .rs__info--label,
.rs__title {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.rs__title {
  font-size: 2rem;
}
.rs__info {
  font-style: italic;
}
.rs__content {
  padding: 2rem;
}
.rs__content--title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>