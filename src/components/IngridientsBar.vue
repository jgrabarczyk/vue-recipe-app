<template>
  <div>
    <label for="ingridients">Pick ingridients</label>
    <select multiple v-if="showBar" v-model="selectedIngridients" v-on:change="submitIngridients" id="ingridients" name="ingridients">
      <option>Default</option>
      <option v-for="(ingridient, index) in ingridients" :key="index">{{ingridient}}</option>
    </select>
  </div>
</template>

<script>
import { bus } from "../main";
export default {
  
  data() {
    return {
      ingridients: [],
      selectedIngridients: [],
      showBar: true
    };
  },

  methods: {
    submitIngridients() {
      bus.$emit("submitIngridients", this.selectedIngridients);
    }
  },

  mounted() {
    this.ingridients = JSON.parse(localStorage.getItem("ingridients"));
  },

  watch: {
    $route: function() {
      this.showBar = this.$route.path === "/" ? true : false;
    }
  }
};
</script>
<style>
select#ingridients{
  height: 400px;
}
</style>
