<template>
  <div class="recipeBox -shadow">
    <router-link class="event-link" :to="{ name: 'recipe', params: { id: recipe.id } }">
      <img class="recipeBox__img" v-bind:src="recipe.img" v-bind:alt="recipe.title">
      <div class="recipeBox__caption">
        <h2 class="recipeBox__title">{{recipe.title}}</h2>
        <p class="recipeBox__cat">category:{{recipe.cat}}</p>
      </div>
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
  flex: 0 1 1;
  position: relative;
  --margin-size: 15px;
  margin: var(--margin-size);
}
.recipeBox__caption {
  /* position: absolute; */
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: hsla(0, 0%, 100%, 0.85);
  z-index: 2;
}
.recipeBox__title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.recipeBox__img {
  margin: 0 auto;
}
@media (min-width: 768px) {
  .recipeBox {
    --border-width: 0px;
    --item-per-row: 2;
    flex: 0 0
      calc(
        100% / var(--item-per-row) - 2 *
          (var(--margin-size) + var(--border-width))
      );
  }
}
@media( min-width: 991px){
  .recipeBox {
    --item-per-row: 3;
  }
}
</style>
