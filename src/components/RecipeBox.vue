<template>
  <div class="recipeBox -shadow">
    <router-link class="event-link" :to="{ name: 'recipe', params: { id: recipe.id } }">
      <img class="recipeBox__img" v-bind:src="recipe.img" v-bind:alt="recipe.title">
      <h2 class="recipeBox__title">{{recipe.title}}</h2>
      <p class="recipeBox__cat">category:{{recipe.cat}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    recipe: Object
  }
};
</script>

<style>
.recipeBox {
  --margin-size: 15px;
  --border-width: 0px;
  --item-per-row: 2;
  flex: 0 0
    calc(
      100% / var(--item-per-row) - 2 *
        (var(--margin-size) + var(--border-width))
    );
  margin: var(--margin-size);
  padding: 2rem;
}
.recipeBox__title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.recipeBox__img {
  margin: 0 auto 30px;
}
</style>
