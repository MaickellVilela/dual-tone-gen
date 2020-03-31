<template>
  <div id="app">
    <MainView msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import MainView from "./components/MainView.vue";

export default {
  name: "App",
  components: {
    MainView
  }
};
</script>

<style lang="scss">
@import "~@/../node_modules/reset.css/reset.css";
</style>
