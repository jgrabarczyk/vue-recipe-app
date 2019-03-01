<template>
  <div class="ingridients">
    <h2 class="rs__content--title">Ingridients:</h2>
    <ul class="rs__list ingridients">
      <li class="rs__list--item" v-for="single in ingridients" v-bind:key="single">
        {{single.ingridient.name}}
        <span>,{{single.ingridient.amount}} times</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    ingridients: Array
  }
};
</script>

<style>
.rs__content--title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
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
.rs__list.ingridients .rs__list--item {
  list-style-type: disc;
  font-weight: bold;
}
</style>
