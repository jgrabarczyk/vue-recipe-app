<template>
  <div>
    <select multiple v-if="showBar" v-model="selected" v-on:change="submitIngridients">
      <option></option>
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
      selected: [],
      showBar: true
    };
  },

  methods: {
    submitIngridients() {
      console.log(this.selected);
      bus.$emit("submitIngridients", this.selected);
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