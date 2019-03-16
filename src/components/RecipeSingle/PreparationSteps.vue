<template>
  <div class="steps">
    <h2 class="rs__content--title">Steps:</h2>
    <ol class="rs__list steps">
      <li class="rs__list--item" v-for="(single, index) in prepSteps" v-bind:key="index">
        <h3>{{single.step.title}}</h3>
        <p>{{single.step.caption}}</p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    prepSteps: Array
  }
};
</script>

<style scoped>
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
</style>
