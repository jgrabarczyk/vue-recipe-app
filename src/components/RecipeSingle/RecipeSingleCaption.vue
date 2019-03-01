<template>
  <div class="rs__caption">
    <h1 class="rs__title">{{title}}</h1>
    <div class="rs__info">
      <span class="rs__info--label">Category:</span>
      {{category}}
    </div>
    <div class="rs__info">
      <span class="rs__info--label">Difficulty:</span>
      <div class="difficulty-wrapper">
        <img class="difficulty-icon" :src="svg" v-for="i in difficulty" :key="i">
      </div>
    </div>
    <div class="rs__info">
      <span class="rs__info--label">Preparation Time:</span>
      {{preptime}} min
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    category: String,
    difficulty: Number,
    preptime: Number
  },
  data() {
    return {
      svg: ""
    };
  },
  created() {
    this.svg = require(`../../assets/icon-difficulty.svg`);
  }
};
</script>

<style scoped>
.rs__info .rs__info--label,
.rs__title {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.rs__info {
  display: flex;
  align-items: center;
}
.rs__title {
  font-size: 2rem;
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
.difficulty-wrapper {
  display: flex;
}
.difficulty-icon {
  flex: 0 0 20px;
  max-width: 20px;
  height: auto;
  margin: 0 5px;
}
</style>
